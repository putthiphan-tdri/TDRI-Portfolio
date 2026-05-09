function render() {
  const categories = data.categories;
  if (!ownerAuthenticated && editMode) {
    discardDraft();
    return;
  }

  app.innerHTML = `
    <div class="site-shell ${editMode ? 'is-editing' : ''} ${ownerAuthenticated ? 'is-owner' : 'is-visitor'}">
      ${renderHeader()}
      <main class="portfolio-stage" id="portfolio">
        ${renderHero()}
        ${renderAbout()}
        ${renderAchievements(categories)}
        ${renderSkillProfile()}
      </main>
      ${renderFooter()}
      ${editMode ? renderEditor() : ''}
      ${modalCategoryId ? renderModal(modalCategoryId) : ''}
      ${loginModalOpen ? renderLoginModal() : ''}
    </div>
  `;

  bindEvents();
}

function renderStable() {
  const scrollY = window.scrollY;
  const editorScrollTop = document.querySelector('.editor-panel')?.scrollTop || 0;
  render();
  requestAnimationFrame(() => {
    window.scrollTo({ top: scrollY, left: 0 });
    const editorPanel = document.querySelector('.editor-panel');
    if (editorPanel) editorPanel.scrollTop = editorScrollTop;
    if (pendingFocusSelector) {
      document.querySelector(pendingFocusSelector)?.focus();
      pendingFocusSelector = '';
    }
  });
}

function getEditorData() {
  return draftData || data;
}

function beginEditing(scope = 'full', categoryId = selectedCategoryId) {
  if (!ownerAuthenticated) {
    openLoginModal();
    return;
  }

  if (!editMode || !draftData) {
    draftData = structuredClone(data);
    hasUnsavedChanges = false;
  }

  editMode = true;
  editorScope = scope;
  if (categoryId) selectedCategoryId = categoryId;

  const editorCategories = getEditorData().categories;
  if (!editorCategories.some((category) => category.id === selectedCategoryId)) {
    selectedCategoryId = editorCategories[0]?.id || '';
  }

  render();
}

function markDraftDirty() {
  hasUnsavedChanges = true;
  const status = document.querySelector('[data-editor-status]');
  if (status) status.textContent = 'Unsaved changes';
}

function commitDraft() {
  if (!ownerAuthenticated) {
    openLoginModal();
    return;
  }

  if (!draftData) return;

  data = mergeData(defaultData, draftData);
  syncCategoryCounts();
  saveData();
  draftData = null;
  hasUnsavedChanges = false;
  editMode = false;
  render();
}

function discardDraft({ requireConfirm = false } = {}) {
  if (requireConfirm && hasUnsavedChanges && !window.confirm('Discard your unsaved edits?')) {
    return false;
  }

  draftData = null;
  hasUnsavedChanges = false;
  editMode = false;
  render();
  return true;
}

function renderHeader() {
  const nav = ['Home', 'My Portfolio'];
  const ownerControls = ownerAuthenticated
    ? `
        <button class="icon-button" type="button" data-action="import" aria-label="Import portfolio JSON" title="Import JSON">
          ${icon('import')}
        </button>
        <button class="icon-button" type="button" data-action="export" aria-label="Export portfolio JSON" title="Export JSON">
          ${icon('download')}
        </button>
        <button class="edit-toggle" type="button" data-action="toggle-edit">
          ${icon('edit')}
          <span>${editMode ? 'Preview' : 'Edit'}</span>
        </button>
        ${isLocalApp ? '' : `<button class="owner-link-button" type="button" data-action="owner-logout">Log out</button>`}
      `
    : `
        <button class="owner-link-button" type="button" data-action="owner-login">
          ${icon('edit')}
          <span>Owner login</span>
        </button>
      `;

  return `
    <header class="topbar">
      ${tdriLogo()}
      <nav class="main-nav" aria-label="Main navigation">
        ${nav.map((item) => `<button class="${item === 'My Portfolio' ? 'active' : ''}" type="button">${item}</button>`).join('')}
      </nav>
      <div class="header-actions">
        ${ownerControls}
        <button class="profile-button" type="button" aria-label="Profile">
          ${data.profile.photo ? `<img src="${data.profile.photo}" alt="">` : icon('user')}
        </button>
      </div>
    </header>
  `;
}

function renderHero() {
  const photoInput = ownerAuthenticated
    ? '<input type="file" accept="image/png, image/jpeg, image/webp" data-action="photo-upload">'
    : '';
  return `
    <section class="hero-grid" aria-label="Researcher introduction">
      <label class="photo-uploader ${data.profile.photo ? 'has-photo' : ''}">
        ${photoInput}
        ${
          data.profile.photo
            ? `<img src="${data.profile.photo}" alt="Researcher portrait">`
            : `<span class="photo-icon">${icon('upload')}<i>${icon('plus')}</i></span>
              <strong>Upload Photo</strong>
              <small>JPG, PNG (Max. 5MB)</small>`
        }
      </label>

      <div class="hero-copy">
        ${editable(data.profile.name, 'profile.name', 'h1')}
        ${editable(data.profile.title, 'profile.title', 'p', 'role-text')}
        ${editable(data.profile.bio, 'profile.bio', 'p', 'bio-text')}
        <div class="contact-row" aria-label="Contact details">
          <span>${icon('mail')}${editable(data.profile.email, 'profile.email')}</span>
          <span class="divider"></span>
          <span>${icon('globe')}${editable(data.profile.website, 'profile.website')}</span>
        </div>
      </div>

      <div class="skyline" aria-hidden="true">
        ${Array.from({ length: 16 }, (_, index) => `<span style="--i:${index}"></span>`).join('')}
      </div>
    </section>
  `;
}

function renderAbout() {
  return `
    <section class="about-band" aria-label="About TDRI">
      <div class="about-icon">${icon('building')}</div>
      <div class="about-copy">
        ${editable(data.organization.title, 'organization.title', 'h2')}
        ${editable(data.organization.description, 'organization.description', 'p')}
      </div>
      ${tdriLogo()}
    </section>
  `;
}

function renderAchievements(categories) {
  return `
    <section class="achievements" aria-label="Achievements">
      <div class="section-heading">
        <div>
          <h2>Portfolio</h2>
          <span aria-hidden="true"></span>
        </div>
        <div class="filters" aria-label="Achievement filters">
          <div class="card-sort-control achievement-sort-control" role="group" aria-label="Sort achievements">
            <span>Sort</span>
            <div class="sort-pill-group">
              <button type="button" class="${data.achievementSort !== 'oldest' ? 'active' : ''}" data-action="sort-achievements" data-value="latest" aria-pressed="${data.achievementSort !== 'oldest'}">Latest</button>
              <button type="button" class="${data.achievementSort === 'oldest' ? 'active' : ''}" data-action="sort-achievements" data-value="oldest" aria-pressed="${data.achievementSort === 'oldest'}">Oldest</button>
            </div>
          </div>
        </div>
      </div>

      ${renderOverviewStats()}

      <div class="achievement-grid">
        ${categories.length ? categories.map((category, index) => renderCategoryCard(category, index)).join('') : renderEmptyState()}
      </div>
    </section>
  `;
}

function renderOverviewStats() {
  const stats = getOverviewStats();

  return `
    <section class="stats-overview" aria-label="Overview statistics">
      <article class="stat-tile">
        <span>Total work</span>
        <strong>${stats.total}</strong>
        <small>Across ${stats.categoryCount} sections</small>
      </article>
      <article class="stat-tile">
        <span>Research projects</span>
        <strong>${stats.projects}</strong>
        <small>${stats.projectYearRange}</small>
      </article>
      <article class="stat-tile">
        <span>Average per year</span>
        <strong>${stats.averagePerYear}</strong>
        <small>${stats.yearRange}</small>
      </article>
      <article class="stat-tile">
        <span>Latest activity</span>
        <strong>${stats.latestYear}</strong>
        <small>${stats.latestYearCount} entries</small>
      </article>
    </section>
  `;
}

function renderCategoryCard(category, index) {
  if (category.type === 'projects') return renderProjectCard(category, index);

  return `
    <article class="achievement-card" style="--accent:${category.accent}; --index:${index}">
      <header>
        <div class="category-icon">${icon(category.icon)}</div>
        <h3>${editable(category.title, `category.${category.id}.title`)}</h3>
        <div class="card-tools">
          <span class="count-input" aria-label="${escapeHtml(category.title)} count">${categoryCount(category)}</span>
          ${renderSectionEditButton(category)}
        </div>
      </header>
      <div class="item-list">
        ${sortedItems(category.items).map((item) => renderCardItem(category.id, item)).join('')}
      </div>
      <button class="view-all" type="button" data-action="open-modal" data-category="${category.id}">
        <span>View all</span>
        ${icon('arrow')}
      </button>
    </article>
  `;
}

function renderProjectCard(category, index) {
  const projectItems = sortedItems(category.items);

  return `
    <article class="achievement-card project-card" style="--accent:${category.accent}; --index:${index}">
      <header>
        <div class="category-icon">${icon(category.icon)}</div>
        <h3>${editable(category.title, `category.${category.id}.title`)}</h3>
        <div class="card-tools">
          <span class="count-input" aria-label="${escapeHtml(category.title)} count">${categoryCount(category)}</span>
          ${renderSectionEditButton(category)}
        </div>
      </header>
      <div class="project-sections">
        <div class="project-list">
          ${
            projectItems.length
              ? projectItems.map((item) => renderProjectItem(category.id, item)).join('')
              : '<p class="empty-projects">No projects yet</p>'
          }
        </div>
      </div>
      <button class="view-all" type="button" data-action="open-modal" data-category="${category.id}">
        <span>View all</span>
        ${icon('arrow')}
      </button>
    </article>
  `;
}

function renderSectionEditButton(category) {
  if (!ownerAuthenticated) return '';

  const isActive = editMode && editorScope === 'section' && selectedCategoryId === category.id;

  return `
    <button class="section-edit-button ${isActive ? 'active' : ''}" type="button" data-action="edit-section" data-category="${category.id}" aria-label="Edit ${escapeHtml(category.title)}">
      ${icon('edit')}
      <span>Edit</span>
    </button>
  `;
}

function renderProjectSection(categoryId, title, items) {
  return `
    <section class="project-status-group" aria-label="${title} research projects">
      <div class="project-status-head">
        <h4>${title}</h4>
        <span>${items.length}</span>
      </div>
      <div class="project-list">
        ${
          items.length
            ? items.map((item) => renderProjectItem(categoryId, item)).join('')
            : '<p class="empty-projects">No projects yet</p>'
        }
      </div>
    </section>
  `;
}

function renderProjectItem(categoryId, item) {
  const title = editMode
    ? editable(item.title, `item.${categoryId}.${item.id}.title`, 'strong')
    : renderLinkedTitle(item);
  const donor = editMode
    ? editable(item.source, `item.${categoryId}.${item.id}.source`, 'small', 'donor-text')
    : `<small>${escapeHtml(item.source || 'Not set')}</small>`;

  return `
    <div class="project-item">
      <div class="project-copy">
        ${title}
        ${donor}
      </div>
      <time>${escapeHtml(formatProjectPeriod(item))}</time>
    </div>
  `;
}

function renderCardItem(categoryId, item) {
  const title = editMode
    ? editable(item.title, `item.${categoryId}.${item.id}.title`, 'strong')
    : renderLinkedTitle(item);

  return `
    <div class="achievement-item">
      <div>
        ${title}
        ${editable(item.source, `item.${categoryId}.${item.id}.source`, 'small')}
      </div>
      ${editable(item.date, `item.${categoryId}.${item.id}.date`, 'time')}
    </div>
  `;
}

function renderLinkedTitle(item) {
  const title = escapeHtml(item.title);
  const href = normalizeUrl(item.link || '');

  if (!href) {
    return `<strong>${title}</strong>`;
  }

  return `<a class="work-link" href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${title}</a>`;
}

function renderEmptyState() {
  return `
    <div class="empty-state">
      <div>${icon('article')}</div>
      <h3>No matching achievements</h3>
      <p>Choose another filter or add a new entry from the editor.</p>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="quote-band">
      <div class="quote-mark" aria-hidden="true">"</div>
      ${editable(data.quote, 'quote', 'p')}
      <div class="campus-line" aria-hidden="true">
        ${Array.from({ length: 8 }, (_, index) => `<span style="--i:${index}"></span>`).join('')}
      </div>
    </footer>
  `;
}

function renderSkillProfile() {
  const profile = data.skillProfile;
  const totalSkills = profile.domains.reduce((total, domain) => total + domain.items.length, 0);
  const sortedDomains = sortedSkillDomains(profile.domains, profile.domainSort);
  const sortedCertifications = sortedCertificates(profile.certifications, profile.certificateSort);

  return `
    <section class="skill-profile-section" aria-label="Skill profile">
      <div class="section-heading skill-heading">
        <div>
          ${editable(profile.title, 'skillProfile.title', 'h2')}
          <span aria-hidden="true"></span>
          ${editable(profile.description, 'skillProfile.description', 'p')}
        </div>
      </div>

      <div class="skill-profile-grid">
        <article class="skill-card core-skills-card">
          <header>
            <div>
              <h3>Skills</h3>
              <p>${totalSkills} skills across ${profile.domains.length} domains</p>
            </div>
            <div class="card-sort-control" role="group" aria-label="Sort skill domains">
              <span>Sort</span>
              <div class="sort-pill-group">
                <button type="button" class="${profile.domainSort !== 'count-asc' ? 'active' : ''}" data-action="sort-skill-domains" data-value="count-desc" aria-pressed="${profile.domainSort !== 'count-asc'}">Most</button>
                <button type="button" class="${profile.domainSort === 'count-asc' ? 'active' : ''}" data-action="sort-skill-domains" data-value="count-asc" aria-pressed="${profile.domainSort === 'count-asc'}">Fewest</button>
              </div>
            </div>
            ${
              ownerAuthenticated
                ? `<button class="section-edit-button skill-card-edit ${editMode && editorScope === 'skills-core' ? 'active' : ''}" type="button" data-action="edit-skills-core" aria-label="Edit Skills">
                    ${icon('edit')}
                    <span>Edit</span>
                  </button>`
                : ''
            }
          </header>
          <div class="skill-domain-list">
            ${sortedDomains.map((domain) => renderSkillDomain(domain)).join('')}
          </div>
        </article>

        <article class="skill-card certification-card">
          <header>
            <div>
              <h3>Certifications</h3>
              <p>${profile.certifications.length} credentials</p>
            </div>
            <div class="card-sort-control" role="group" aria-label="Sort certifications">
              <span>Sort</span>
              <div class="sort-pill-group">
                <button type="button" class="${profile.certificateSort !== 'oldest' ? 'active' : ''}" data-action="sort-certificates" data-value="latest" aria-pressed="${profile.certificateSort !== 'oldest'}">Latest</button>
                <button type="button" class="${profile.certificateSort === 'oldest' ? 'active' : ''}" data-action="sort-certificates" data-value="oldest" aria-pressed="${profile.certificateSort === 'oldest'}">Oldest</button>
              </div>
            </div>
            ${
              ownerAuthenticated
                ? `<button class="section-edit-button skill-card-edit ${editMode && editorScope === 'skills-certifications' ? 'active' : ''}" type="button" data-action="edit-skills-certifications" aria-label="Edit Certifications">
                    ${icon('edit')}
                    <span>Edit</span>
                  </button>`
                : ''
            }
          </header>
          <div class="certification-list">
            ${sortedCertifications.map((certificate) => renderCertification(certificate)).join('')}
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderLoginModal() {
  return `
    <div class="owner-login-backdrop" role="presentation" data-action="close-owner-login">
      <form class="owner-login-panel" data-action="owner-login-submit" role="dialog" aria-modal="true" aria-label="Owner login">
        <button class="icon-button owner-login-close" type="button" data-action="close-owner-login" aria-label="Close owner login">×</button>
        <span class="owner-login-kicker">Portfolio owner</span>
        <h2>Unlock editing</h2>
        <p>Visitors can view this portfolio. Editing is available only after owner login.</p>
        <label>
          <span>Password</span>
          <input type="password" name="password" autocomplete="current-password" required autofocus>
        </label>
        ${loginError ? `<small class="owner-login-error">${escapeHtml(loginError)}</small>` : ''}
        <button class="primary-button" type="submit">Log in</button>
      </form>
    </div>
  `;
}

function renderSkillDomain(domain) {
  const items = sortedSkillItems(domain.items);

  return `
    <section class="skill-domain">
      <div class="skill-domain-head">
        <div class="skill-domain-icon">${icon('skills')}</div>
        <h4>${escapeHtml(domain.title)}</h4>
        <span>${domain.items.length}</span>
      </div>
      <div class="skill-chip-list">
        ${items.map((item) => renderSkillItem(item)).join('')}
      </div>
    </section>
  `;
}

function renderSkillItem(item) {
  return `
    <div class="skill-chip">
      <strong>${escapeHtml(item.name)}</strong>
      <span>${escapeHtml(normalizeSkillType(item.type))}</span>
      <small>${escapeHtml(item.level)}</small>
    </div>
  `;
}

function renderCertification(certificate) {
  const title = escapeHtml(certificate.title);
  const href = normalizeUrl(certificate.link || '');
  const titleMarkup = href
    ? `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${title}</a>`
    : `<strong>${title}</strong>`;

  return `
    <div class="certification-item">
      <div class="certification-badge">${icon('award')}</div>
      <div>
        ${titleMarkup}
        <small>${escapeHtml(certificate.issuer || 'Issuer not set')}</small>
      </div>
      <time>${escapeHtml(certificate.date || 'Date not set')}</time>
    </div>
  `;
}
