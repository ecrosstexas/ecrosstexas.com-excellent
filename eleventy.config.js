/**
 * I try to keep the `eleventy.config.js` file clean and uncluttered. Most adjustments must be made in:
 *  - `./config/collections/index.js`
 *  - `./config/filters/index.js`
 *  - `./config/plugins/index.js`
 *  - `./config/shortcodes/index.js`
 *  - `./config/transforms/index.js`
 */

// JSDoc comment: Hint VS Code for eleventyConfig autocompletion. © Henry Desroches - https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf

/**
 *  @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */

// module import filters
const {
  toISOString,
  formatDate,
  toAbsoluteUrl,
  stripHtml,
  minifyCss,
  minifyJs,
  splitlines,
  getWebmentionsForUrl,
  webmentionSize,
  webmentionsByType,
  isOwnWebmention,
  sortWebmentions
} = require('./config/filters/index.js');

// module import shortcodes
const {imageShortcode, includeRaw, liteYoutube} = require('./config/shortcodes/index.js');

// tags
const tag_aliases = require("./src/_data/tag_aliases.json");

// module import collections
const {getAllPosts, onlyMarkdown, tagList} = require('./config/collections/index.js');

// module import ecrosstexas collections
const {getAllLinks, getAllVideos, getAllPeople, getAllFaces, getAllBookNotes, getAllTVNotes} = require('./config/collections/ecrosstexas.js');


// module import events
const {svgToJpeg} = require('./config/events/index.js');

// plugins
const {EleventyRenderPlugin} = require('@11ty/eleventy');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language');
const bundlerPlugin = require('@11ty/eleventy-plugin-bundle');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const embedEverything = require("eleventy-plugin-embed-everything");

const markdownLib = require('./config/plugins/markdown.js');
const {slugifyString} = require('./config/utils/index.js');
const yaml = require('js-yaml');

module.exports = eleventyConfig => {
  // 	--------------------- Custom Watch Targets -----------------------
  eleventyConfig.addWatchTarget('./src/assets');
  eleventyConfig.addWatchTarget('./utils/*.js');

  // --------------------- layout aliases -----------------------
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('home', 'home.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('blog', 'blog.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');
  eleventyConfig.addLayoutAlias('tags', 'tags.njk');
  eleventyConfig.addLayoutAlias('link', 'link.njk');
  eleventyConfig.addLayoutAlias('note', 'note.njk');
  eleventyConfig.addLayoutAlias('video', 'video.njk');

  // 	---------------------  Custom filters -----------------------

  eleventyConfig.addFilter('toIsoString', toISOString);
  eleventyConfig.addFilter('formatDate', formatDate);
  eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrl);
  eleventyConfig.addFilter('stripHtml', stripHtml);
  eleventyConfig.addFilter('slugify', slugifyString);
  eleventyConfig.addFilter('splitlines', splitlines);

  eleventyConfig.addFilter('cssmin', minifyCss);
  eleventyConfig.addNunjucksAsyncFilter('jsmin', minifyJs);

  eleventyConfig.addFilter('toJson', JSON.stringify);
  eleventyConfig.addFilter('fromJson', JSON.parse);

  eleventyConfig.addFilter('keys', Object.keys);
  eleventyConfig.addFilter('values', Object.values);
  eleventyConfig.addFilter('entries', Object.entries);

  eleventyConfig.addFilter('getWebmentionsForUrl', getWebmentionsForUrl);
  eleventyConfig.addFilter('webmentionSize', webmentionSize);
  eleventyConfig.addFilter('webmentionsByType', webmentionsByType);
  eleventyConfig.addFilter('isOwnWebmention', isOwnWebmention);
  eleventyConfig.addFilter('sortWebmentions', sortWebmentions);

  // ----------------------- STUFF THAT NEEDS TO CLEANED UP FROM 11TY BASE BLOG ------------
  // Filters
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

  // Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});

  // get package.json
const packageVersion = require('./package.json').version;

  // 	--------------------- Custom shortcodes ---------------------
  eleventyConfig.addNunjucksAsyncShortcode('eleventyImage', imageShortcode);
  eleventyConfig.addShortcode('youtube', liteYoutube);
  eleventyConfig.addShortcode('include_raw', includeRaw);
  eleventyConfig.addShortcode('packageVersion', () => `v${packageVersion}`);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`); // current year, by stephanie eckles

  // 	--------------------- Custom transforms ---------------------
  eleventyConfig.addPlugin(require('./config/transforms/html-config.js'));

  // 	--------------------- Custom Template Languages ---------------------
  eleventyConfig.addPlugin(require('./config/template-languages/css-config.js'));
  eleventyConfig.addPlugin(require('./config/template-languages/js-config.js'));

  // 	--------------------- Custom collections -----------------------
  eleventyConfig.addCollection('posts', getAllPosts);
  eleventyConfig.addCollection('onlyMarkdown', onlyMarkdown);
  eleventyConfig.addCollection('tagList', tagList);
  // --------------------- ecrosstexas added collections ---------------------
  eleventyConfig.addCollection('links', getAllLinks);
  eleventyConfig.addCollection('videos', getAllVideos);
  eleventyConfig.addCollection('people', getAllPeople);
  eleventyConfig.addCollection('faces', getAllFaces);
  eleventyConfig.addCollection('notesbooks', getAllBookNotes);
  eleventyConfig.addCollection('notestv', getAllTVNotes);
  
  // 	--------------------- Events ---------------------
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    // this only runs in development, on your machine, so og images get installed fonts.
    eleventyConfig.on('eleventy.after', svgToJpeg);
  }

  // 	--------------------- Plugins ---------------------
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(inclusiveLangPlugin);
  eleventyConfig.addPlugin(bundlerPlugin);
  eleventyConfig.addPlugin(embedEverything);
  eleventyConfig.setLibrary('md', markdownLib);

  // Add support for YAML data files with .yaml extension
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  // 	--------------------- Passthrough File Copy -----------------------
  // same path
  ['src/assets/fonts/', 'src/assets/images/template', 'src/assets/og-images'].forEach(
    path => eleventyConfig.addPassthroughCopy(path)
    );
 // to root
 eleventyConfig.addPassthroughCopy({'src/assets/images/favicon/*': '/'});

  // pagefind demo
  const { execSync } = require('child_process')
  eleventyConfig.on('eleventy.after', () => {
    execSync(`npx pagefind --site dist --output-path dist/pagefind --glob \"**/*.html\"`, { encoding: 'utf-8' })
})


  // 	--------------------- general config -----------------------
  return {
    // Pre-process *.md, *.html and global data files files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    // Optional (default is set): If your site deploys to a subdirectory, change `pathPrefix`, for example with with GitHub pages
    pathPrefix: '/',

    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
};
