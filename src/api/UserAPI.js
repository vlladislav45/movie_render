import BaseAPI from './BaseAPI';

class UserAPI extends BaseAPI {
  
  uploadImage = image => this.post('/user/uploadProfilePicture', image, {
    headers: {
      ['Content-Type']: 'multipart/form-data',
    },
  });
  
  updateData = data => this.post('user/userInfo', data);
  
  changeTheme = theme => this.post('user/userPreferences/theme', { selectedTheme: theme })
}

export default new UserAPI();
