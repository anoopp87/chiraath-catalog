module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("url_encode", (value) => encodeURIComponent(value || ""));

  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("_headers");

  eleventyConfig.addCollection("products", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/products/*.md");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data"
    }
  };
};