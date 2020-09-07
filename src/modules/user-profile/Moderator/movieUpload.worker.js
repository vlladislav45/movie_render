const CHUNK_SIZE = 10000000; // 10MB


self.addEventListener('message', msg => {// eslint-disable-line no-restricted-globals
  const { data: { file, movieName, userUploaded, url } } = msg;
  
  uploadFile(file, movieName, userUploaded, url)
});

async function uploadFile(file, movieName, userUploaded, url) {
  let percentage = 0;
  let start = 0;
  let part = 0;
  let size = file.size;
  const TOTAL_CHUNKS = size / CHUNK_SIZE;
  while (start < size) {
    const fd = new FormData();
    const chunkName = `${movieName}_${userUploaded}_${part}`;
    const chunk = file.slice(start, start + CHUNK_SIZE);
    
    fd.append('file', chunk, chunkName);
    const response = await fetch(url, {
      method: 'post',
      mode: 'cors',
      body: fd
    }).then(res => res.json())
    if (!response.success) {
      self.postMessage({ status: 'failed' });
      break;
    }
    
    percentage = Math.ceil(100 * part / TOTAL_CHUNKS);
    self.postMessage({ progress: percentage, status: 'success' })
    start = start + CHUNK_SIZE;
    part++;
  }
  
  console.group('ITS ALL OVER');
  console.log(part);
  console.log(file.size);
  console.groupEnd();
}

