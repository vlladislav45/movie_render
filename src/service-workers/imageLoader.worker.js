/**
 * Service worker for background image fetching
 * currently used only for the list of movies
 */

// Not using our API classes or axios to be self sufficient
const fetchImage = url => new Promise(resolve => {
  fetch(url).
    then(res => res.blob()).
    then(blob => resolve(URL.createObjectURL(blob)));
});

// Do not load images that are already loaded
// TODO: Implement caching and comparing new content
const loadedImages = [];


self.addEventListener('message', msg => {// eslint-disable-line no-restricted-globals
  const { data: { url, id }, currentTarget: { origin } } = msg;
  // TODO: figure out origin
  // if (!origin) return;

  if (loadedImages.includes(id))
    return;

  fetchImage(url).then(res => {
    loadedImages.push(id);
    self.postMessage({ id, imageData: res });// eslint-disable-line no-restricted-globals
  });
});
