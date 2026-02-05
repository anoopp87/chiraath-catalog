module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("url_encode", (value) =>
    encodeURIComponent(value || ""),
  );

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
