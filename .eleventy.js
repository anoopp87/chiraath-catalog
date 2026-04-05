module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("url_encode", (value) =>
    encodeURIComponent(value || ""),
  );

  // Returns true if the date is within the last 14 days (for "New" badge)
  eleventyConfig.addFilter("isNew", function (date) {
    if (!date) return false;
    const diffDays = (Date.now() - new Date(date)) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 14;
  });

  // Products added in the last 7 days (for "New this week" section)
  eleventyConfig.addCollection("productsNewThisWeek", function (collectionApi) {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return collectionApi
      .getFilteredByGlob("src/products/*.md")
      .filter((p) => !p.data.hidden && p.data.in_stock !== false)
      .filter((p) => new Date(p.data.date || 0).getTime() >= sevenDaysAgo)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("_headers");

  // All products (sorted)
  eleventyConfig.addCollection("productsSorted", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/products/*.md")
      .filter((p) => !p.data.hidden)
      .sort((a, b) => {
        // In-stock first
        const aStock = a.data.in_stock === false ? 0 : 1;
        const bStock = b.data.in_stock === false ? 0 : 1;
        if (aStock !== bStock) return bStock - aStock;

        // Newest first
        const aDate = new Date(a.data.date || a.date || 0).getTime();
        const bDate = new Date(b.data.date || b.date || 0).getTime();
        return bDate - aDate;
      });
  });

  // Sarees only (sorted)
  eleventyConfig.addCollection("sareesSorted", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/products/*.md")
      .filter((p) => !p.data.hidden)
      .filter((p) => (p.data.category || "").toLowerCase() === "saree")
      .sort((a, b) => {
        const aStock = a.data.in_stock === false ? 0 : 1;
        const bStock = b.data.in_stock === false ? 0 : 1;
        if (aStock !== bStock) return bStock - aStock;

        const aDate = new Date(a.data.date || a.date || 0).getTime();
        const bDate = new Date(b.data.date || b.date || 0).getTime();
        return bDate - aDate;
      });
  });

  // Salwars only (sorted)
  eleventyConfig.addCollection("salwarsSorted", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/products/*.md")
      .filter((p) => !p.data.hidden)
      .filter((p) => (p.data.category || "").toLowerCase() === "salwar")
      .sort((a, b) => {
        const aStock = a.data.in_stock === false ? 0 : 1;
        const bStock = b.data.in_stock === false ? 0 : 1;
        if (aStock !== bStock) return bStock - aStock;

        const aDate = new Date(a.data.date || a.date || 0).getTime();
        const bDate = new Date(b.data.date || b.date || 0).getTime();
        return bDate - aDate;
      });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
    },
  };
};
