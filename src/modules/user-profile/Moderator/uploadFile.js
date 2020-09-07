import ModeratorAPI from 'api/ModeratorAPI';

const CHUNK_SIZE = 10000000; // 10MB

export async function uploadFile(file, movieName, userUploaded, onProgress) {
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
    const { data } = await ModeratorAPI.uploadChunk(fd);

    if (!data.success) {
      break;
    }
    
    percentage = Math.ceil(100 * part / TOTAL_CHUNKS);
    onProgress(percentage);
    start = start + CHUNK_SIZE;
    part++;
  }
  console.group('ITS ALL OVER');
  console.log(part);
  console.log(file.size);
  console.groupEnd();
}