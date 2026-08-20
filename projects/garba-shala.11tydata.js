const { isReleased } = require("../_lib/publishing");

module.exports = {
  eleventyComputed: {
    eleventyExcludeFromCollections: data => !isReleased(data.date),
    permalink: data => isReleased(data.date)
      ? "projects/garba-shala/index.html"
      : false
  }
};
