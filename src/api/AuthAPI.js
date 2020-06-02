import BaseAPI from './BaseAPI';

class AuthAPI extends BaseAPI {

  register = data => this.post('/register', data);

  login = credentials => this.post('/login', credentials);

  logout = () => this.post('/logout');
}

export default new AuthAPI();