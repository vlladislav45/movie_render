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
  
  getReviewsByUser = (userId, count, offset) => this.get(`user/userInfo/reviewsByAuthor?userId=${userId}&page=${offset}&size=${count}`);
}

export default new UserAPI();
