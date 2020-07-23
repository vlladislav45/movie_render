import BaseAPI from './BaseAPI';

class UserAPI extends BaseAPI {

  uploadImage = image => this.post('/upload', image, {
    headers: {
      ['Content-Type']: 'multipart/form-data',
    },
  });
}

export default new UserAPI();
