// Not using our API classes or axios to be self sufficient
const fetchImage = url => new Promise(resolve => {
  fetch(url).
    then(res => res.blob()).
    then(blob => resolve(URL.createObjectURL(blob)));
});

// Do not load images that are already loaded
// TODO: Implement caching and comparing new content
const loadedImages = [];

self.addEventListener('message', msg => {
  const { data: { url, id }, currentTarget: { origin } } = msg;
  // TODO: figure out origin
  // if (!origin) return;

  if (loadedImages.includes(id))
    return;

  fetchImage(url).then(res => {
    loadedImages.push(id);
    self.postMessage({ id, imageData: res });
  });
});
