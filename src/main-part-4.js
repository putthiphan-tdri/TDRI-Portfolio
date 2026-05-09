async function initOwnerAuth() {
  if (isLocalApp) return;

  try {
    const response = await fetch('/api/auth', {
      cache: 'no-store',
      credentials: 'same-origin',
    });
    if (!response.ok) return;
    const status = await response.json();
    ownerAuthenticated = Boolean(status.authenticated);
    authChecked = true;
    render();
  } catch {
    authChecked = true;
  }
}

function openLoginModal() {
  if (isLocalApp) return;
  loginError = '';
  loginModalOpen = true;
  render();
}

function closeLoginModal() {
  loginModalOpen = false;
  loginError = '';
  render();
}

async function submitOwnerLogin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const password = new FormData(form).get('password');

  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const details = await response.json().catch(() => ({}));
      loginError = details.error || 'Login failed';
      render();
      return;
    }

    ownerAuthenticated = true;
    loginModalOpen = false;
    loginError = '';
    render();
  } catch {
    loginError = 'Login failed. Please try again.';
    render();
  }
}

async function logoutOwner() {
  discardDraft();

  try {
    await fetch('/api/auth', {
      method: 'DELETE',
      credentials: 'same-origin',
    });
  } catch {}

  ownerAuthenticated = false;
  loginModalOpen = false;
  render();
}

function bindEvents() {
  document.querySelectorAll('[data-action="owner-login"]').forEach((button) => {
    button.addEventListener('click', openLoginModal);
  });

  document.querySelectorAll('[data-action="owner-logout"]').forEach((button) => {
    button.addEventListener('click', logoutOwner);
  });

  document.querySelectorAll('[data-action="owner-login-submit"]').forEach((form) => {
    form.addEventListener('submit', submitOwnerLogin);
  });

  document.querySelectorAll('[data-action="close-owner-login"]').forEach((element) => {
    element.addEventListener('click', (event) => {
      if (event.currentTarget === event.target || event.currentTarget.classList.contains('owner-login-close')) {
        closeLoginModal();
      }
    });
  });

  document.querySelectorAll('[data-action="toggle-edit"]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!editMode) {
        beginEditing('full');
        return;
      }

      discardDraft({ requireConfirm: true });
    });
  });

  document.querySelectorAll('[data-action="close-editor"]').forEach((button) => {
    button.addEventListener('click', () => {
      discardDraft({ requireConfirm: true });
    });
  });

  document.querySelectorAll('[data-action="commit-draft"]').forEach((button) => {
    button.addEventListener('click', commitDraft);
  });

  document.querySelectorAll('[data-action="discard-draft"]').forEach((button) => {
    button.addEventListener('click', () => {
      discardDraft();
    });
  });

  document.querySelectorAll('[data-action="open-full-editor"]').forEach((button) => {
    button.addEventListener('click', () => {
      beginEditing('full');
    });
  });

  document.querySelectorAll('[data-action="edit-section"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      beginEditing('section', event.currentTarget.dataset.category);
    });
  });

  document.querySelectorAll('[data-action="edit-skills-core"]').forEach((button) => {
    button.addEventListener('click', () => {
      beginEditing('skills-core');
    });
  });

  document.querySelectorAll('[data-action="edit-skills-certifications"]').forEach((button) => {
    button.addEventListener('click', () => {
      beginEditing('skills-certifications');
    });
  });

  document.querySelectorAll('[data-action="import"]').forEach((button) => {
    button.addEventListener('click', importData);
  });

  document.querySelectorAll('[data-action="export"]').forEach((button) => {
    button.addEventListener('click', exportData);
  });

  document.querySelectorAll('[data-action="photo-upload"]').forEach((input) => {
    input.addEventListener('change', handlePhotoUpload);
  });

  document.querySelectorAll('[data-input]').forEach((input) => {
    const handleDraftInput = (event) => {
      setByPath(event.currentTarget.dataset.input, event.currentTarget.value, getEditorData());
      markDraftDirty();
    };

    input.addEventListener('input', handleDraftInput);
    input.addEventListener('change', handleDraftInput);
  });

  document.querySelectorAll('[data-field-input]').forEach((input) => {
    input.addEventListener('input', (event) => {
      applyEditableField(event.currentTarget.dataset.fieldInput, event.currentTarget.value);
      markDraftDirty();
    });
  });

  document.querySelectorAll('[data-skill-domain-input]').forEach((input) => {
    input.addEventListener('input', (event) => {
      const [domainId, prop] = event.currentTarget.dataset.skillDomainInput.split('.');
      updateSkillDomain(domainId, prop, event.currentTarget.value);
      markDraftDirty();
    });
  });

  document.querySelectorAll('[data-skill-item-input]').forEach((input) => {
    const handleSkillInput = (event) => {
      const [domainId, itemId, prop] = event.currentTarget.dataset.skillItemInput.split('.');
      updateSkillItem(domainId, itemId, prop, event.currentTarget.value);
      markDraftDirty();
      if (event.type === 'change' && prop === 'level') renderStable();
    };

    input.addEventListener('input', handleSkillInput);
    input.addEventListener('change', handleSkillInput);
  });

  document.querySelectorAll('[data-certificate-input]').forEach((input) => {
    input.addEventListener('input', (event) => {
      const [certificateId, prop] = event.currentTarget.dataset.certificateInput.split('.');
      updateCertificate(certificateId, prop, event.currentTarget.value);
      markDraftDirty();
    });
  });

  document.querySelectorAll('[data-item-input]').forEach((input) => {
    const handleItemInput = (event) => {
      const [categoryId, itemId, prop] = event.currentTarget.dataset.itemInput.split('.');
      updateItem(categoryId, itemId, prop, event.currentTarget.value);
      markDraftDirty();
      if (event.type === 'change' && prop === 'status') renderStable();
    };

    input.addEventListener('input', handleItemInput);
    input.addEventListener('change', handleItemInput);

  });

  document.querySelectorAll('[data-field]').forEach((field) => {
    field.addEventListener('blur', (event) => {
      applyEditableField(event.currentTarget.dataset.field, event.currentTarget.textContent.trim());
    });
  });

  document.querySelectorAll('[data-action="sort-achievements"]').forEach((control) => {
    const handleAchievementSort = (event) => {
      const shouldUseDraft = Boolean(event.currentTarget.closest('.editor-panel')) || (editMode && draftData);
      const targetData = shouldUseDraft ? getEditorData() : data;
      targetData.achievementSort = event.currentTarget.dataset.value || event.currentTarget.value;

      if (shouldUseDraft) {
        markDraftDirty();
        return;
      }

      saveData();
      render();
    };

    control.addEventListener(control.tagName === 'SELECT' ? 'change' : 'click', handleAchievementSort);
  });

  document.querySelectorAll('[data-action="sort-skill-domains"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      data.skillProfile.domainSort = event.currentTarget.dataset.value;
      saveData();
      render();
    });
  });

  document.querySelectorAll('[data-action="sort-certificates"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      data.skillProfile.certificateSort = event.currentTarget.dataset.value;
      saveData();
      render();
    });
  });

  const categorySelect = document.querySelector('[data-action="select-category"]');
  if (categorySelect) {
    categorySelect.addEventListener('change', (event) => {
      selectedCategoryId = event.currentTarget.value;
      renderStable();
    });
  }

  document.querySelectorAll('[data-action="select-category-row"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      selectedCategoryId = event.currentTarget.dataset.category;
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="add-item"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const id = addItem(event.currentTarget.dataset.category);
      if (id) pendingFocusSelector = `[data-editor-item="${id}"] input`;
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="delete-item"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      deleteItem(event.currentTarget.dataset.category, event.currentTarget.dataset.item);
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="add-category"]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = `category-${Date.now()}`;
      getEditorData().categories.push({
        id,
        title: 'New Category',
        count: 1,
        accent: '#4078b8',
        icon: 'article',
        items: [
          {
            id: `item-${Date.now()}`,
            title: 'New portfolio entry',
            source: 'Research note',
            date: 'Apr 2026',
            link: '',
          },
        ],
      });
      selectedCategoryId = id;
      editorScope = 'full';
      activeFilter = 'all';
      pendingFocusSelector = `[data-field-input="category.${id}.title"]`;
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="add-skill-domain"]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = addSkillDomain();
      if (id) pendingFocusSelector = `[data-skill-domain="${id}"] input`;
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="delete-skill-domain"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      deleteSkillDomain(event.currentTarget.dataset.domain);
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="add-skill-item"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const id = addSkillItem(event.currentTarget.dataset.domain);
      if (id) pendingFocusSelector = `[data-skill-item="${id}"] input`;
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="delete-skill-item"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      deleteSkillItem(event.currentTarget.dataset.domain, event.currentTarget.dataset.skill);
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="add-certificate"]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = addCertificate();
      if (id) pendingFocusSelector = `[data-certificate="${id}"] input`;
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="delete-certificate"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      deleteCertificate(event.currentTarget.dataset.certificate);
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="open-modal"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      modalCategoryId = event.currentTarget.dataset.category;
      render();
    });
  });

  document.querySelectorAll('[data-action="close-modal"]').forEach((element) => {
    element.addEventListener('click', (event) => {
      if (event.currentTarget === event.target || event.currentTarget.classList.contains('modal-close')) {
        modalCategoryId = null;
        render();
      }
    });
  });

  document.querySelectorAll('[data-action="reset"]').forEach((button) => {
    button.addEventListener('click', () => {
      draftData = structuredClone(defaultData);
      selectedCategoryId = draftData.categories[0].id;
      editorScope = 'full';
      activeFilter = 'all';
      modalCategoryId = null;
      markDraftDirty();
      renderStable();
    });
  });
}

function refreshPreviewOnly() {
  document.querySelectorAll('[data-field]').forEach((field) => {
    const value = getValueByField(field.dataset.field);
    if (document.activeElement !== field && value !== undefined) {
      field.textContent = value;
    }
  });
}

function getValueByField(field) {
  if (field.startsWith('category.')) {
    const [, categoryId, prop] = field.split('.');
    return data.categories.find((category) => category.id === categoryId)?.[prop];
  }

  if (field.startsWith('item.')) {
    const [, categoryId, itemId, prop] = field.split('.');
    return data.categories
      .find((category) => category.id === categoryId)
      ?.items.find((item) => item.id === itemId)?.[prop];
  }

  return field.split('.').reduce((target, prop) => target?.[prop], data);
}

function applyEditableField(field, value) {
  if (field.startsWith('category.')) {
    const [, categoryId, prop] = field.split('.');
    const category = getEditorData().categories.find((item) => item.id === categoryId);
    if (category) category[prop] = value;
    return;
  }

  if (field.startsWith('item.')) {
    const [, categoryId, itemId, prop] = field.split('.');
    updateItem(categoryId, itemId, prop, value);
    return;
  }

  setByPath(field, value, getEditorData());
}

function setByPath(path, value, target = data) {
  const parts = path.split('.');
  let cursor = target;

  while (parts.length > 1) {
    cursor = cursor[parts.shift()];
  }

  cursor[parts[0]] = value;
}

function updateItem(categoryId, itemId, prop, value) {
  const category = getEditorData().categories.find((item) => item.id === categoryId);
  const item = category?.items.find((entry) => entry.id === itemId);
  if (item) item[prop] = value;
}

function addItem(categoryId) {
  const category = getEditorData().categories.find((item) => item.id === categoryId);
  if (!category) return '';

  const id = category.type === 'projects' ? `project-${Date.now()}` : `item-${Date.now()}`;

  if (category.type === 'projects') {
    category.items.push({
      id,
      title: 'New research project',
      source: 'Project donor',
      startDate: 'Apr 2026',
      endDate: 'Mar 2027',
      status: 'ongoing',
      link: '',
    });
    return id;
  }

  category.items.push({
    id,
    title: 'New portfolio entry',
    source: 'Research note',
    date: 'Apr 2026',
    link: '',
  });
  return id;
}

function sortedItems(items) {
  if (data.achievementSort === 'manual') return [...items];

  if (data.achievementSort === 'year-desc' || data.achievementSort === 'year-asc') {
    const direction = data.achievementSort === 'year-asc' ? 1 : -1;
    return [...items].sort((a, b) => {
      const aYear = yearForItem(a);
      const bYear = yearForItem(b);

      if (aYear === bYear) {
        return (parseWorkDate(sortDateForItem(a)) - parseWorkDate(sortDateForItem(b))) * direction;
      }

      return (aYear - bYear) * direction;
    });
  }

  const direction = data.achievementSort === 'oldest' ? 1 : -1;
  return [...items].sort((a, b) => {
    const aTime = parseWorkDate(sortDateForItem(a));
    const bTime = parseWorkDate(sortDateForItem(b));

    if (aTime === bTime) return 0;
    return (aTime - bTime) * direction;
  });
}

function sortDateForItem(item) {
  return item.endDate || item.startDate || item.date;
}

function yearForItem(item) {
  const year = extractYear(sortDateForItem(item));
  return year || 0;
}

function extractYear(value) {
  const match = String(value || '').match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : 0;
}

function formatProjectPeriod(item) {
  const start = String(item.startDate || '').trim();
  const end = String(item.endDate || '').trim() || (item.status === 'done' ? '' : 'Present');

  if (start && end) return `${start} - ${end}`;
  return start || end || 'Date not set';
}

function parseWorkDate(value) {
  const text = String(value || '').trim();
  if (!text) return Number.NEGATIVE_INFINITY;

  const normalized = text
    .replace(/(\d+)(st|nd|rd|th)/gi, '$1')
    .replace(/[.,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const year = extractYear(normalized);

  if (year) {
    const lower = normalized.toLowerCase();
    const monthEntry = [...monthLookup.entries()].find(([name]) => {
      return new RegExp(`(^|\\s)${name}(\\s|$)`, 'i').test(lower);
    });

    if (monthEntry) {
      return Date.UTC(year, monthEntry[1], 1);
    }

    const isoMonth = normalized.match(/\b(19|20)\d{2}[-/](0?[1-9]|1[0-2])\b/);
    if (isoMonth) {
      return Date.UTC(year, Number(isoMonth[2]) - 1, 1);
    }

    const slashMonth = normalized.match(/\b(0?[1-9]|1[0-2])[-/](19|20)\d{2}\b/);
    if (slashMonth) {
      return Date.UTC(year, Number(slashMonth[1]) - 1, 1);
    }
  }

  const parsed = Date.parse(normalized);
  if (!Number.isNaN(parsed)) return parsed;

  if (year) return Date.UTC(year, 0, 1);

  return Number.NEGATIVE_INFINITY;
}

function normalizeUrl(value) {
  const trimmed = String(value || '').trim();
  if (!trimmed) return '';

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function normalizeSkillType(type) {
  const normalized = String(type || '').trim();
  if (skillTypeOptions.includes(normalized)) return normalized;

  const matchingType = skillTypeOptions.find((typeName) => (
    skillTypeSchema[typeName].aliases.includes(normalized)
  ));
  if (matchingType) return matchingType;

  return 'Platform';
}

function normalizeSkillItem(item) {
  const normalizedItem = { ...item, type: normalizeSkillType(item.type) };
  const name = String(normalizedItem.name || '').toLowerCase();

  if (
    normalizedItem.type === 'Method'
    && (name.includes('skill.md') || name.includes('connector'))
  ) {
    normalizedItem.type = 'Technical';
  }

  return normalizedItem;
}

function normalizeSkillDomains(domains) {
  return structuredClone(domains).map((domain) => ({
    ...domain,
    items: Array.isArray(domain.items)
      ? domain.items.map((item) => normalizeSkillItem(item))
      : [],
  }));
}

function skillLevelRank(level) {
  return skillLevelOrder[level] ?? skillLevelOptions.length;
}

function sortedSkillItems(items) {
  return [...items].sort((a, b) => skillLevelRank(a.level) - skillLevelRank(b.level));
}

function sortedSkillDomains(domains, sort = 'count-desc') {
  const direction = sort === 'count-asc' ? 1 : -1;
  return [...domains].sort((a, b) => {
    const countDiff = ((a.items?.length || 0) - (b.items?.length || 0)) * direction;
    if (countDiff !== 0) return countDiff;
    return String(a.title || '').localeCompare(String(b.title || ''));
  });
}

function sortedCertificates(certificates, sort = 'latest') {
  const direction = sort === 'oldest' ? 1 : -1;
  return [...certificates].sort((a, b) => {
    const dateDiff = (parseWorkDate(a.date) - parseWorkDate(b.date)) * direction;
    if (dateDiff !== 0) return dateDiff;
    return String(a.title || '').localeCompare(String(b.title || ''));
  });
}

function deleteItem(categoryId, itemId) {
  const category = getEditorData().categories.find((item) => item.id === categoryId);
  if (!category) return;

  category.items = category.items.filter((item) => item.id !== itemId);
}

function categoryCount(category) {
  return Array.isArray(category.items) ? category.items.length : 0;
}

function syncCategoryCounts() {
  data.categories.forEach((category) => {
    category.count = categoryCount(category);
  });
}

function getOverviewStats() {
  const allItems = data.categories.flatMap((category) =>
    category.items.map((item) => ({ category, item }))
  );
  const nonProjectCategories = data.categories.filter((category) => category.type !== 'projects');
  const nonProjectItems = allItems.filter(({ category }) => category.type !== 'projects');
  const projectCategory = data.categories.find((category) => category.type === 'projects');
  const projectItems = projectCategory?.items || [];
  const years = allItems.map(({ item }) => yearForItem(item)).filter(Boolean);
  const uniqueYears = [...new Set(years)].sort((a, b) => a - b);
  const averagePerYear = uniqueYears.length
    ? (allItems.length / uniqueYears.length).toFixed(1).replace(/\.0$/, '')
    : '0';
  const topSection = data.categories.reduce(
    (top, category) => (categoryCount(category) > categoryCount(top) ? category : top),
    data.categories[0] || { title: 'None', items: [] }
  );

  return {
    total: nonProjectItems.length,
    categoryCount: nonProjectCategories.length,
    projects: projectItems.length,
    yearCount: uniqueYears.length,
    yearRange: uniqueYears.length
      ? `${uniqueYears[0]} - ${uniqueYears.at(-1)}`
      : 'No dated entries',
    projectYearRange: projectItems.length
      ? projectItems
        .map((item) => yearForItem(item))
        .filter(Boolean)
        .sort((a, b) => a - b)
        .reduce((range, year, index, years) => index === years.length - 1 ? `${years[0]} - ${year}` : range, '')
      : 'No project entries',
    averagePerYear,
    topSectionTitle: topSection.title || 'None',
    topSectionCount: categoryCount(topSection),
    latestYear: uniqueYears.at(-1) || 'None',
    latestYearCount: uniqueYears.length
      ? allItems.filter(({ item }) => yearForItem(item) === uniqueYears.at(-1)).length
      : 0,
  };
}

function findSkillDomain(domainId, target = getEditorData()) {
  return target.skillProfile.domains.find((domain) => domain.id === domainId);
}

function findSkillItem(domainId, itemId, target = getEditorData()) {
  return findSkillDomain(domainId, target)?.items.find((item) => item.id === itemId);
}

function updateSkillDomain(domainId, prop, value) {
  const domain = findSkillDomain(domainId);
  if (domain) domain[prop] = value;
}

function updateSkillItem(domainId, itemId, prop, value) {
  const item = findSkillItem(domainId, itemId);
  if (!item) return;

  item[prop] = prop === 'type' ? normalizeSkillType(value) : value;
}

function updateCertificate(certificateId, prop, value) {
  const certificate = getEditorData().skillProfile.certifications.find((item) => item.id === certificateId);
  if (certificate) certificate[prop] = value;
}

function addSkillDomain() {
  const id = `skill-domain-${Date.now()}`;
  getEditorData().skillProfile.domains.push({
    id,
    title: 'New Skill Domain',
    items: [
      {
        id: `skill-${Date.now()}`,
        name: 'New skill',
        type: 'Platform',
        level: 'Working',
      },
    ],
  });
  return id;
}

function deleteSkillDomain(domainId) {
  const editorData = getEditorData();
  editorData.skillProfile.domains = editorData.skillProfile.domains.filter((domain) => domain.id !== domainId);
}

function addSkillItem(domainId) {
  const domain = findSkillDomain(domainId);
  if (!domain) return '';

  const id = `skill-${Date.now()}`;
  domain.items.push({
    id,
    name: 'New skill',
    type: 'Platform',
    level: 'Working',
  });
  return id;
}

function deleteSkillItem(domainId, itemId) {
  const domain = findSkillDomain(domainId);
  if (!domain) return;

  domain.items = domain.items.filter((item) => item.id !== itemId);
}

function addCertificate() {
  const id = `cert-${Date.now()}`;
  getEditorData().skillProfile.certifications.push({
    id,
    title: 'New certificate',
    issuer: 'Issuing organization',
    date: 'Apr 2026',
    link: '',
  });
  return id;
}

function deleteCertificate(certificateId) {
  const editorData = getEditorData();
  editorData.skillProfile.certifications = editorData.skillProfile.certifications.filter(
    (certificate) => certificate.id !== certificateId
  );
}

function handlePhotoUpload(event) {
  const [file] = event.currentTarget.files;
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    event.currentTarget.setCustomValidity('Please use an image under 5MB.');
    event.currentTarget.reportValidity();
    return;
  }

  event.currentTarget.setCustomValidity('');
  compressProfilePhoto(file).then((photoDataUrl) => {
    data.profile.photo = photoDataUrl;
    if (draftData) {
      draftData.profile.photo = photoDataUrl;
      markDraftDirty();
    }
    saveData();
    render();
  }).catch(() => {
    event.currentTarget.setCustomValidity('This image could not be loaded. Please try a JPG, PNG, or WEBP file.');
    event.currentTarget.reportValidity();
  });
}

function compressProfilePhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('error', reject);
    reader.addEventListener('load', () => {
      const image = new Image();
      image.addEventListener('error', reject);
      image.addEventListener('load', () => {
        const maxSize = 900;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.84));
      });
      image.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!imported.profile || !Array.isArray(imported.categories)) {
          alert('Invalid portfolio JSON file.');
          return;
        }
        Object.keys(data).forEach((k) => delete data[k]);
        Object.assign(data, imported);
        saveData();
        render();
      } catch {
        alert('Failed to read the file. Please check that it is a valid JSON file.');
      }
    };
    reader.readAsText(file);
  });
  input.click();
}

function exportData() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'tdri-researcher-portfolio.json';
  anchor.click();
  URL.revokeObjectURL(url);
}

render();
initOwnerAuth();
