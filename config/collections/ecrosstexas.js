/** COLLECTIONS SPECIFIC TO ECROSSTEXAS.COM */

/** Returns all link posts as a collection. */
const getAllLinks = collection => {
  const projects = collection.getFilteredByGlob('./src/links/*.md');
  return projects.reverse();
};

/** Returns all video posts as a collection. */
const getAllVideos = collection => {
  const projects = collection.getFilteredByGlob('./src/videos/*.md');
  return projects.reverse();
};

// Returns a list of people ordered by filename
const getAllPeople = collection => {
  const projects = collection.getFilteredByGlob('./src/people/*.md').sort((a, b) => {
    return Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1;
    
  });
  return projects;
};

// Returns a list of people ordered by filename
const getAllFaces = collection => {
  const projects = collection.getFilteredByGlob('./src/faces/*.md').sort((a, b) => {
    return Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1;
    
  });
  return projects;
};

// Returns a list of book notes ordered by filename
const getAllBookNotes = collection => {
  const projects = collection.getFilteredByGlob('./src/notes/books/*.md');
  return projects.reverse();
};

// Returns a list of TV notes ordered by filename
const getAllTVNotes = collection => {
  const projects = collection.getFilteredByGlob('./src/notes/tv/*.md');
  return projects.reverse();
};

// idea from https://grgml.xyz/blog/website-updates-bookmarks-status-and-more/

const getAllBookmarks = collection => {
	const bookmarks = collection.getFilteredByGlob('./src/bookmarks/**/*.md');
	return posts.reverse();
};

module.exports = {
getAllLinks,
getAllVideos,
getAllPeople,
getAllFaces,
getAllBookNotes,
getAllTVNotes,
getAllBookmarks
};
