module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("_headers");

  // 🔴 THIS IS THE IMPORTANT LINE
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