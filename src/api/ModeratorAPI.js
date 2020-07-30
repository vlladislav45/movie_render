import BaseAPI from './BaseAPI';

class ModeratorAPI extends BaseAPI {

  uploadMovie = (movie, onProgress) => this.post('/upload', movie, {
    onUploadProgress: onProgress,
    headers: {
      ['Content-Type']: 'multipart/form-data',
    },
  });

}

export default new ModeratorAPI();
