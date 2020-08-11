import BaseAPI from './BaseAPI';
import { parseIpResponse } from '../utils/textUtils';

class AuthAPI extends BaseAPI {
  
  register = data => this.post('/register_user', data);
  
  login = async credentials => {
    const { ip, uag, loc } = await fetch('https://www.cloudflare.com/cdn-cgi/trace')
    .then(res => res.text())
    .then(res => Promise.resolve(parseIpResponse(res)));
    
    return this.post('/login', {
      ...credentials,
      ip, uag, loc
    });
  }
  
  logout = () => this.post('/logout');
  
  usernameAvailable = username => this.get(
    '/register/userAvailable/' + username);
  
  checkToken = token => this.post('user_me', { jwt: token });
}

export default new AuthAPI();
