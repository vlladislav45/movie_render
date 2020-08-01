import BaseAPI from './BaseAPI';

class AuthAPI extends BaseAPI {

  register = data => this.post('/register_user', data);

  login = credentials => this.post('/login', credentials);

  logout = () => this.post('/logout');

  usernameAvailable = username => this.get(
    '/register/userAvailable/' + username);

  checkToken = token => this.post('user_me', { jwt: token });
}

export default new AuthAPI();
