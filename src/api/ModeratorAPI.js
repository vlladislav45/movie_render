import BaseAPI from './BaseAPI';

class ModeratorAPI extends BaseAPI {
  
  uploadMovie = (movie, onProgress) => this.post('/admin/movie/upload', movie, {
    onUploadProgress: onProgress,
    headers: {
      ['Content-Type']: 'multipart/form-data',
    },
  });
  
  // TODO: Delete this
  uploadChunk = (chunk) => this.post('/admin/movie/upload', chunk, {
    headers: {
      ['Content-Type']: 'multipart/form-data',
    },
  });
}

export default new ModeratorAPI();
