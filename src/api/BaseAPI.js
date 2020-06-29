import axios from 'axios';
import { serverDown } from 'reducers/connectionReducer';

const API_SERVER = 'http://localhost';
// const API_SERVER = 'http://192.168.1.115';
const API_PORT = '8090';
export const API_URL = `${API_SERVER}:${API_PORT}/`;

class BaseAPI {

  constructor () {
    this.initialize();
  }

  initialize = () => {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    this.addInterceptors();

  };

  addInterceptors () {
    import('redux-store').then(module => {
      const { default: reduxStore } = module;
      this.api.interceptors.response.use(response => response,
        error => {
          if (error.response)
            return Promise.reject(error);

          reduxStore.dispatch(serverDown());
            return Promise.reject('Error handled in axios interceptor');
        });
    });
  }

  get = (url, options) => this.api.get(url, options);

  post = (url, data, options) => this.api.post(url, data, options);
}

export default BaseAPI;
