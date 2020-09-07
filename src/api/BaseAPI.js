import axios from 'axios';
import { JWT_TOKEN } from 'config/authConstants';

const API_SERVER = 'http://localhost';
// const API_SERVER = 'http://91.139.236.5';
// const API_SERVER = 'http://192.168.0.105';
// const API_PORT = '8090';
const API_PORT = '8080';
export const API_URL = `${API_SERVER}:${API_PORT}/`;

//TODO: Revert back to reasonable amount of time
export const RETRY_CONNECTION_TIMEOUT = 1000000;

class BaseAPI {
  
  constructor() {
    this.initialize();
  }
  
  initialize = () => {
    this.api = axios.create({
      baseURL: API_URL,
      // baseURL: API_URL,
      timeout: RETRY_CONNECTION_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    
    this.addInterceptors();
  };
  
  addInterceptors() {
      this.api.interceptors.request.use(req => {
        const jwt = localStorage.getItem(JWT_TOKEN);
        if (jwt)
          req.headers['Authorization'] = `Bearer ${jwt}`;
        return req;
      });
      
      // noinspection JSCheckFunctionSignatures
      this.api.interceptors.response.use(
        res => res,
        err => this.responseFailureInterceptor(err));
  }
  
  
  get = (url, options) => this.api.get(url, options);
  
  post = (url, data, options) => this.api.post(url, data, options);
  
  responseFailureInterceptor = error => {
    if (error.response) {
      const { response: { status, data } } = error;
      // Unauthorized
      if (status === 401) {
        // I cannot import at top level so im doing dynamic import
        // Since i dont expect this to happen so often (401 unauthorized)
        // I believe it will not make performance issues
        Promise.all([import('reducers/auth'), import('redux-store')]).then(([authModule, reduxStoreModule]) => {
          const { tokenExpired } = authModule;
          const { dispatch } = reduxStoreModule.default;
          dispatch(tokenExpired());
        })
      }
      console.group('Request error');
      console.log(status);
      console.log(data);
      console.groupEnd();
      return Promise.reject(error.response);
    }
    return Promise.reject('Connection error');
  };
}

export default BaseAPI;
