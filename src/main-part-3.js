function renderEditor() {
  const editorData = getEditorData();

  if (editorScope === 'skills-core' || editorScope === 'skills-certifications') {
    return renderSkillEditor(editorScope, editorData);
  }

  const selected = editorData.categories.find((category) => category.id === selectedCategoryId) || editorData.categories[0];
  const isFullEditor = editorScope === 'full';

  return `
    <aside class="editor-panel" aria-label="Portfolio editor">
      ${renderEditorHead(isFullEditor ? 'Portfolio content' : selected.title, isFullEditor ? 'Draft editor' : 'Section editor')}

      ${
        isFullEditor
          ? `<label class="panel-sort">
              <span>Achievement sort order</span>
              <select data-action="sort-achievements">
                <option value="latest" ${editorData.achievementSort === 'latest' ? 'selected' : ''}>Latest work at top</option>
                <option value="oldest" ${editorData.achievementSort === 'oldest' ? 'selected' : ''}>Oldest work at top</option>
              </select>
            </label>

            <form class="editor-form" data-form="profile">
              <label>
                <span>Name</span>
                <input value="${escapeHtml(editorData.profile.name)}" data-input="profile.name">
              </label>
              <label>
                <span>Position / Title</span>
                <input value="${escapeHtml(editorData.profile.title)}" data-input="profile.title">
              </label>
              <label>
                <span>Short Bio</span>
                <textarea rows="4" data-input="profile.bio">${escapeHtml(editorData.profile.bio)}</textarea>
              </label>
              <div class="split-fields">
                <label>
                  <span>Email</span>
                  <input value="${escapeHtml(editorData.profile.email)}" data-input="profile.email">
                </label>
                <label>
                  <span>Website</span>
                  <input value="${escapeHtml(editorData.profile.website)}" data-input="profile.website">
                </label>
              </div>
              <label>
                <span>About TDRI</span>
                <textarea rows="4" data-input="organization.description">${escapeHtml(editorData.organization.description)}</textarea>
              </label>
              <label>
                <span>Footer quote</span>
                <textarea rows="3" data-input="quote">${escapeHtml(editorData.quote)}</textarea>
              </label>
            </form>

            <div class="category-order-block">
              <div class="editor-row">
                <h3>Achievement sections</h3>
                <button type="button" class="secondary-button" data-action="add-category">Add Category</button>
              </div>
              ${renderCategoryOrderList(editorData.categories, selected.id)}
            </div>`
          : `<p class="section-editor-note">This panel edits only the selected achievement section. Save applies the draft to the page.</p>`
      }

      <div class="category-editor">
        ${
          isFullEditor
            ? `<div class="editor-row section-lock">
                <label>
                  <span>Section name</span>
                  <input value="${escapeHtml(selected.title)}" data-field-input="category.${selected.id}.title">
                </label>
              </div>
              <label>
                <span>Editing section</span>
                <select data-action="select-category">
                  ${editorData.categories.map((category) => `<option value="${category.id}" ${category.id === selected.id ? 'selected' : ''}>${escapeHtml(category.title)}</option>`).join('')}
                </select>
              </label>`
            : `<div class="editor-row section-lock">
                <label>
                  <span>Editing section</span>
                  <input value="${escapeHtml(selected.title)}" data-field-input="category.${selected.id}.title">
                </label>
              </div>`
        }

        ${renderSelectedEditorItems(selected)}

        <button type="button" class="primary-button" data-action="add-item" data-category="${selected.id}">
          ${icon('plus')}
          <span>${selected.type === 'projects' ? 'Add Project' : 'Add Achievement'}</span>
        </button>
      </div>

      <div class="editor-tools">
        ${
          isFullEditor
            ? `<button type="button" class="secondary-button" data-action="reset">Reset draft</button>
              <button type="button" class="primary-button" data-action="export">
                ${icon('download')}
                <span>Export saved JSON</span>
              </button>`
            : `<button type="button" class="secondary-button" data-action="open-full-editor">Open Full Editor</button>`
        }
      </div>
    </aside>
  `;
}

function renderEditorHead(title, eyebrow) {
  return `
    <div class="editor-head">
      <div>
        <span>${escapeHtml(eyebrow)}</span>
        <h2>${escapeHtml(title)}</h2>
        <small data-editor-status>${hasUnsavedChanges ? 'Unsaved changes' : 'Draft ready'}</small>
      </div>
      <div class="editor-head-actions">
        <button type="button" class="secondary-button" data-action="discard-draft">Discard</button>
        <button type="button" class="primary-button" data-action="commit-draft">Save changes</button>
        <button class="icon-button" type="button" data-action="close-editor" aria-label="Close editor">${icon('edit')}</button>
      </div>
    </div>
  `;
}

function renderCategoryOrderList(categories, selectedId) {
  return `
    <div class="editor-order-list">
      ${categories.map((category) => `
        <div class="editor-order-row ${category.id === selectedId ? 'active' : ''}">
          <button type="button" data-action="select-category-row" data-category="${category.id}">
            <strong>${escapeHtml(category.title)}</strong>
            <small>${categoryCount(category)} entries</small>
          </button>
        </div>
      `).join('')}
    </div>
  `;
}

function renderSelectedEditorItems(category) {
  if (category.type === 'projects') return renderProjectEditorGroups(category);

  return `
    <div class="category-list">
      ${category.items.map((item) => renderEditorItem(category.id, item)).join('')}
    </div>
  `;
}

function renderProjectEditorGroups(category) {
  const ongoingItems = category.items.filter((item) => item.status !== 'done');
  const doneItems = category.items.filter((item) => item.status === 'done');

  return `
    <div class="project-editor-groups">
      ${renderProjectEditorGroup(category.id, 'On-going', 'ongoing', ongoingItems)}
      ${renderProjectEditorGroup(category.id, 'Done', 'done', doneItems)}
    </div>
  `;
}

function renderProjectEditorGroup(categoryId, title, status, items) {
  return `
    <section class="editor-subgroup">
      <div class="project-status-head">
        <h4>${title}</h4>
        <span>${items.length}</span>
      </div>
      <div class="category-list">
        ${items.map((item) => renderProjectEditorItem(categoryId, item)).join('')}
      </div>
    </section>
  `;
}

function renderSkillEditor(scope, editorData) {
  const profile = editorData.skillProfile;
  const isCoreScope = scope === 'skills-core';
  const title = isCoreScope ? 'Skills' : 'Certifications';
  const typeGuide = skillTypeOptions
    .map((type) => `${type}: ${skillTypeSchema[type].description}`)
    .join(' · ');

  return `
    <aside class="editor-panel" aria-label="Skill Profile editor">
      ${renderEditorHead(title, 'Section editor')}

      <p class="section-editor-note">${
        isCoreScope
          ? typeGuide
          : 'Credentials are sorted by certificate date.'
      }</p>

      <form class="editor-form" data-form="skills">
        <label>
          <span>Section title</span>
          <input value="${escapeHtml(profile.title)}" data-input="skillProfile.title">
        </label>
        <label>
          <span>Description</span>
          <textarea rows="3" data-input="skillProfile.description">${escapeHtml(profile.description)}</textarea>
        </label>
        ${
          isCoreScope
            ? `<label>
                <span>Domain sort</span>
                <select data-input="skillProfile.domainSort">
                  <option value="count-desc" ${profile.domainSort !== 'count-asc' ? 'selected' : ''}>Most skills first</option>
                  <option value="count-asc" ${profile.domainSort === 'count-asc' ? 'selected' : ''}>Fewest skills first</option>
                </select>
              </label>`
            : `<label>
                <span>Certificate sort</span>
                <select data-input="skillProfile.certificateSort">
                  <option value="latest" ${profile.certificateSort !== 'oldest' ? 'selected' : ''}>Latest date first</option>
                  <option value="oldest" ${profile.certificateSort === 'oldest' ? 'selected' : ''}>Oldest date first</option>
                </select>
              </label>`
        }
      </form>

      ${
        isCoreScope
          ? `<div class="skill-editor-block">
              <div class="editor-row">
                <h3>Domains</h3>
                <button type="button" class="secondary-button" data-action="add-skill-domain">Add Domain</button>
              </div>
              <div class="skill-editor-list">
                ${sortedSkillDomains(profile.domains, profile.domainSort).map((domain) => renderSkillDomainEditor(domain)).join('')}
              </div>
            </div>`
          : `<div class="skill-editor-block">
              <div class="editor-row">
                <h3>Certifications</h3>
                <button type="button" class="secondary-button" data-action="add-certificate">Add Certificate</button>
              </div>
              <div class="skill-editor-list">
                ${sortedCertificates(profile.certifications, profile.certificateSort).map((certificate) => renderCertificateEditor(certificate)).join('')}
              </div>
            </div>`
      }

      <div class="editor-tools">
        <button type="button" class="secondary-button" data-action="open-full-editor">Open Full Editor</button>
      </div>
    </aside>
  `;
}

function renderEditorSummary(title, meta) {
  return `
    <div class="editor-summary-copy">
      <strong>${escapeHtml(title || 'Untitled')}</strong>
      <small>${escapeHtml(meta || 'No details yet')}</small>
    </div>
  `;
}

function renderSkillDomainEditor(domain) {
  const items = sortedSkillItems(domain.items);

  return `
    <details class="editor-item skill-domain-editor" data-skill-domain="${domain.id}" open>
      <summary>
        ${renderEditorSummary(domain.title, `${domain.items.length} skills`)}
      </summary>
      <label>
        <span>Domain</span>
        <input value="${escapeHtml(domain.title)}" data-skill-domain-input="${domain.id}.title">
      </label>
      <div class="skill-editor-list compact">
        ${items.map((item) => renderSkillItemEditor(domain.id, item)).join('')}
      </div>
      <div class="editor-tools inline-tools">
        <button type="button" class="secondary-button" data-action="add-skill-item" data-domain="${domain.id}">Add Skill</button>
        <button type="button" class="delete-button" data-action="delete-skill-domain" data-domain="${domain.id}">
          ${icon('trash')}
          <span>Delete Domain</span>
        </button>
      </div>
    </details>
  `;
}

function renderSkillItemEditor(domainId, item) {
  const selectedType = normalizeSkillType(item.type);

  return `
    <details class="editor-item skill-item-editor" data-skill-item="${item.id}" open>
      <summary>
        ${renderEditorSummary(item.name, `${selectedType} / ${item.level}`)}
      </summary>
      <label>
        <span>Skill / Capability</span>
        <input value="${escapeHtml(item.name)}" data-skill-item-input="${domainId}.${item.id}.name">
      </label>
      <div class="split-fields">
        <label>
          <span>Type</span>
          <select data-skill-item-input="${domainId}.${item.id}.type">
            ${skillTypeOptions.map((type) => `<option value="${type}" ${selectedType === type ? 'selected' : ''}>${type}</option>`).join('')}
          </select>
        </label>
        <label>
          <span>Level</span>
          <select data-skill-item-input="${domainId}.${item.id}.level">
            ${skillLevelOptions.map((level) => `<option value="${level}" ${item.level === level ? 'selected' : ''}>${level}</option>`).join('')}
          </select>
        </label>
      </div>
      <div class="editor-tools inline-tools">
        <button type="button" class="delete-button" data-action="delete-skill-item" data-domain="${domainId}" data-skill="${item.id}">
          ${icon('trash')}
          <span>Delete Skill</span>
        </button>
      </div>
    </details>
  `;
}

function renderCertificateEditor(certificate) {
  return `
    <details class="editor-item" data-certificate="${certificate.id}" open>
      <summary>
        ${renderEditorSummary(certificate.title, `${certificate.issuer || 'Issuer not set'} / ${certificate.date || 'Date not set'}`)}
      </summary>
      <label>
        <span>Certificate</span>
        <input value="${escapeHtml(certificate.title)}" data-certificate-input="${certificate.id}.title">
      </label>
      <label>
        <span>Issuer</span>
        <input value="${escapeHtml(certificate.issuer)}" data-certificate-input="${certificate.id}.issuer">
      </label>
      <div class="split-fields">
        <label>
          <span>Date</span>
          <input value="${escapeHtml(certificate.date)}" data-certificate-input="${certificate.id}.date">
        </label>
        <label>
          <span>Link</span>
          <input type="url" placeholder="https://..." value="${escapeHtml(certificate.link || '')}" data-certificate-input="${certificate.id}.link">
        </label>
      </div>
      <button type="button" class="delete-button" data-action="delete-certificate" data-certificate="${certificate.id}">
        ${icon('trash')}
        <span>Delete Certificate</span>
      </button>
    </details>
  `;
}

function renderEditorItem(categoryId, item) {
  const category = getEditorData().categories.find((entry) => entry.id === categoryId);
  if (category?.type === 'projects') return renderProjectEditorItem(categoryId, item);

  return `
    <details class="editor-item" data-editor-item="${item.id}" open>
      <summary>
        ${renderEditorSummary(item.title, `${item.source || 'Source not set'} / ${item.date || 'Date not set'}`)}
      </summary>
      <label>
        <span>Title</span>
        <input value="${escapeHtml(item.title)}" data-item-input="${categoryId}.${item.id}.title">
      </label>
      <div class="split-fields">
        <label>
          <span>Source</span>
          <input value="${escapeHtml(item.source)}" data-item-input="${categoryId}.${item.id}.source">
        </label>
        <label>
          <span>Date</span>
          <input value="${escapeHtml(item.date)}" data-item-input="${categoryId}.${item.id}.date">
        </label>
      </div>
      <label>
        <span>Link</span>
        <input type="url" placeholder="https://www.tdri.or.th/..." value="${escapeHtml(item.link || '')}" data-item-input="${categoryId}.${item.id}.link">
      </label>
      ${normalizeUrl(item.link || '') ? `<a class="editor-link-preview" href="${escapeHtml(normalizeUrl(item.link || ''))}" target="_blank" rel="noreferrer">Open hyperlink</a>` : ''}
      <button type="button" class="delete-button" data-action="delete-item" data-category="${categoryId}" data-item="${item.id}">
        ${icon('trash')}
        <span>Delete</span>
      </button>
    </details>
  `;
}

function renderProjectEditorItem(categoryId, item) {
  return `
    <details class="editor-item" data-editor-item="${item.id}" open>
      <summary>
        ${renderEditorSummary(item.title, `${item.source || 'Donor not set'} / ${formatProjectPeriod(item)}`)}
      </summary>
      <label>
        <span>Project Title</span>
        <input value="${escapeHtml(item.title)}" data-item-input="${categoryId}.${item.id}.title">
      </label>
      <label>
        <span>Donor</span>
        <input value="${escapeHtml(item.source)}" data-item-input="${categoryId}.${item.id}.source">
      </label>
      <div class="split-fields">
        <label>
          <span>Start Date</span>
          <input value="${escapeHtml(item.startDate || '')}" data-item-input="${categoryId}.${item.id}.startDate">
        </label>
        <label>
          <span>End Date</span>
          <input value="${escapeHtml(item.endDate || '')}" data-item-input="${categoryId}.${item.id}.endDate">
        </label>
      </div>
      <label>
        <span>Status</span>
        <select data-item-input="${categoryId}.${item.id}.status">
          <option value="ongoing" ${item.status !== 'done' ? 'selected' : ''}>On-going</option>
          <option value="done" ${item.status === 'done' ? 'selected' : ''}>Done</option>
        </select>
      </label>
      <label>
        <span>Link</span>
        <input type="url" placeholder="https://www.tdri.or.th/..." value="${escapeHtml(item.link || '')}" data-item-input="${categoryId}.${item.id}.link">
      </label>
      ${normalizeUrl(item.link || '') ? `<a class="editor-link-preview" href="${escapeHtml(normalizeUrl(item.link || ''))}" target="_blank" rel="noreferrer">Open hyperlink</a>` : ''}
      <button type="button" class="delete-button" data-action="delete-item" data-category="${categoryId}" data-item="${item.id}">
        ${icon('trash')}
        <span>Delete</span>
      </button>
    </details>
  `;
}

function renderModal(categoryId) {
  const category = data.categories.find((item) => item.id === categoryId);
  if (!category) return '';

  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="modal-sheet" aria-modal="true" role="dialog" aria-label="${escapeHtml(category.title)} entries">
        <button class="icon-button modal-close" type="button" data-action="close-modal" aria-label="Close">${icon('plus')}</button>
        <header>
          <div class="category-icon" style="--accent:${category.accent}">${icon(category.icon)}</div>
          <div>
            <h2>${escapeHtml(category.title)}</h2>
            <p>${categoryCount(category)} portfolio entries</p>
          </div>
        </header>
        <div class="modal-list">
          ${renderModalItems(category)}
        </div>
      </section>
    </div>
  `;
}

function renderModalItems(category) {
  if (category.type !== 'projects') {
    return sortedItems(category.items).map((item) => renderCardItem(category.id, item)).join('');
  }

  const projectItems = sortedItems(category.items);
  return projectItems.length
    ? `<div class="project-list">${projectItems.map((item) => renderProjectItem(category.id, item)).join('')}</div>`
    : '<p class="empty-projects">No projects yet</p>';
}

