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

render();
