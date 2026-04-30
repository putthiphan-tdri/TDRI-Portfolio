(function applyPublicSeedOverride() {
  if (!window.TDRI_PORTFOLIO_SEED || typeof window.TDRI_PORTFOLIO_SEED !== 'object') return;

  const seed = structuredClone(window.TDRI_PORTFOLIO_SEED);
  Object.keys(defaultData).forEach((key) => {
    delete defaultData[key];
  });
  Object.assign(defaultData, seed);
  data = loadData();
  if (!['latest', 'oldest'].includes(data.achievementSort)) data.achievementSort = 'latest';
  selectedCategoryId = data.categories[0]?.id || '';
})();
