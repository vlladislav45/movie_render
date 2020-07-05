import BaseAPI from './BaseAPI';

class AuthAPI extends BaseAPI {

  register = data => this.post('/register_user', data);

  login = credentials => this.post('/login', credentials, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    }
  });

  logout = () => this.post('/logout');

  usernameAvailable = username => this.get(
    '/register/userAvailable/' + username);
}

export default new AuthAPI();
