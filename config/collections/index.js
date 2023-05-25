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

module.exports = {
getAllPosts, 
getAllLinks,
getAllVideos,
getAllPeople,
getAllFaces
};
