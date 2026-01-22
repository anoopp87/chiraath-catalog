module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("_headers");

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data"
    }
  };
};