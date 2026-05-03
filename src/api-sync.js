(async function syncFromApi() {
  // Skip API sync when running locally
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  )
    return;

  try {
    const res = await fetch('/api/portfolio', { cache: 'no-store' });
    if (!res.ok) return; // No blob stored yet — seed data is used
    const apiData = await res.json();
    if (!apiData || !apiData.profile || !Array.isArray(apiData.categories))
      return;
    Object.keys(data).forEach((k) => delete data[k]);
    Object.assign(data, apiData);
    selectedCategoryId = data.categories[0]?.id || '';
    render();
  } catch {
    // Network error or API unavailable — fall back to seed data
  }
})();
