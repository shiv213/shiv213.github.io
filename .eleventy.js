const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-es");
const htmlmin = require("html-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

  // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Configuration API: use eleventyConfig.addLayoutAlias(from, to) to add
  // layout aliases! Say you have a bunch of existing content using
  // layout: post. If you don’t want to rewrite all of those values, just map
  // post to a new file like this:
  // eleventyConfig.addLayoutAlias("post", "layouts/my_new_post_layout.njk");

  // Merge data instead of overriding
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Add support for maintenance-free post authors
  // Adds an authors collection using the author key in our post frontmatter
  // Thanks to @pdehaan: https://github.com/pdehaan
  eleventyConfig.addCollection("authors", collection => {
    const blogs = collection.getFilteredByGlob("posts/*.md");
    return blogs.reduce((coll, post) => {
      const author = post.data.author;
      if (!author) {
        return coll;
      }
      if (!coll.hasOwnProperty(author)) {
        coll[author] = [];
      }
      coll[author].push(post.data);
      return coll;
    }, {});
  });

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Year from a Date
  eleventyConfig.addFilter("year", function(dateObj) {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy");
  });

  // Project collections by file slug
  eleventyConfig.addFilter("matchingSlugs", function(items, slugs) {
    if (!Array.isArray(items) || !Array.isArray(slugs)) return [];
    const set = new Set(slugs);
    // Preserve the order given in `slugs`
    const found = new Map();
    for (const item of items) {
      if (set.has(item.fileSlug)) found.set(item.fileSlug, item);
    }
    return slugs.map(s => found.get(s)).filter(Boolean);
  });

  eleventyConfig.addFilter("excludingSlugs", function(items, slugs) {
    if (!Array.isArray(items)) return [];
    const set = new Set(Array.isArray(slugs) ? slugs : []);
    return items.filter(item => !set.has(item.fileSlug));
  });

  // First N items of an array
  eleventyConfig.addFilter("head", function(arr, n) {
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, n);
  });

  // Concat two arrays into one
  eleventyConfig.addFilter("concat", function(a, b) {
    return (Array.isArray(a) ? a : []).concat(Array.isArray(b) ? b : []);
  });

  // Sort an array of Eleventy items by .date descending
  eleventyConfig.addFilter("sortByDateDesc", function(items) {
    if (!Array.isArray(items)) return [];
    return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  // Strip a trailing slash from a URL/string
  eleventyConfig.addFilter("stripTrailingSlash", function(s) {
    if (typeof s !== "string") return s;
    return s.endsWith("/") ? s.slice(0, -1) : s;
  });

  // Tag counts across a collection, excluding a base tag. Returns
  // sorted array of { tag, count } (desc by count, then alpha).
  eleventyConfig.addFilter("tagCounts", function(items, excludeTag) {
    const counts = {};
    if (!Array.isArray(items)) return [];
    for (const item of items) {
      const tags = (item.data && item.data.tags) || [];
      for (const t of tags) {
        if (t === excludeTag) continue;
        counts[t] = (counts[t] || 0) + 1;
      }
    }
    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  });

  // Minify JS
  eleventyConfig.addFilter("jsmin", function(code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath && outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("android-chrome-192x192.png");
  eleventyConfig.addPassthroughCopy("android-chrome-512x512.png");
  eleventyConfig.addPassthroughCopy("site.webmanifest");
  eleventyConfig.addPassthroughCopy("static/img");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("_includes/assets/");

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: false
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
