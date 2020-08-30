import BaseAPI from './BaseAPI';

class UserAPI extends BaseAPI {
  
  uploadImage = image => this.post('/user/uploadProfilePicture', image, {
    headers: {
      ['Content-Type']: 'multipart/form-data',
    },
  });
  
  updateData = data => this.post('user/userInfo', data);
  
  changeTheme = theme => this.post('settings/userPreferences/theme', { selectedTheme: theme });
  
  getByUsername = username => this.get(`user?username=${username}`);
}

export default new UserAPI();
