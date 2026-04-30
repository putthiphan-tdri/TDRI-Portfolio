function renderProjectEditorGroups(category) {
  return `
    <div class="category-list">
      ${category.items.map((item) => renderProjectEditorItem(category.id, item)).join('')}
    </div>
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
