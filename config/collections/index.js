/** Returns all blog posts as a collection. */
const getAllPosts = collection => {
  const projects = collection.getFilteredByGlob('./src/posts/*.md');
  return projects.reverse();
};

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

module.exports = {
getAllPosts, 
getAllLinks,
getAllVideos
};
