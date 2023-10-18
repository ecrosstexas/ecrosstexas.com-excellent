const {DateTime} = require("luxon")

module.exports = {
    layout: "note-book",
    tags: ["books"],
    permalink: "/notes/books/{{ title | slugify }}-{{ isbn }}/index.html",
    eleventyComputed: {
        dateString: ({page}) => DateTime.fromJSDate(page.release_date, {zone: 'utc'}).toLocaleString(DateTime.DATE_FULL)
    }
}
