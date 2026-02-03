module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("url_encode", (value) =>
    encodeURIComponent(value || ""),
  );

  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("_headers");

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
        const aDate = new Date(a.date || 0).getTime();
        const bDate = new Date(b.date || 0).getTime();
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
