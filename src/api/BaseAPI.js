import axios from 'axios';

import {
  finishedRequest,
  initiatedRequest, internetDown, networkDown,
  serverDown,
} from 'reducers/connectionReducer';
import {
  checkInternetConnection,
  ConnectionStatus,
} from 'utils/apiUtils';

const API_SERVER = 'http://localhost';
// const API_SERVER = 'http://192.168.1.115';
const API_PORT = '8090';
export const API_URL = `${API_SERVER}:${API_PORT}/`;

export const RETRY_CONNECTION_TIMEOUT = 5000;

//TODO: maybe i dont need to save unfinished requests
// because i cannot execute their callbacks
class BaseAPI {

  constructor () {
    this.initialize();
  }

  initialize = () => {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: RETRY_CONNECTION_TIMEOUT,
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

      this.api.interceptors.request.use(req => {
        reduxStore.dispatch(initiatedRequest(req));
        return req;
      });

      // noinspection JSCheckFunctionSignatures
      this.api.interceptors.response.use(
        resp => this.responseSuccessInterceptor(resp, reduxStore),
        err => this.responseFailureInterceptor(err, reduxStore));

      axios.interceptors.response.use(
        resp => this.responseSuccessInterceptor(resp, reduxStore),
        err => this.responseFailureInterceptor(err, reduxStore));
    });
  }

  //RIP OOP
  static request = req => axios.request(req);

  get = (url, options) => this.api.get(url, options);

  post = (url, data, options) => this.api.post(url, data, options);

  responseSuccessInterceptor = (response, reduxStore) => {
    reduxStore.dispatch(finishedRequest(response.config));
    return Promise.resolve(response);
  };

  responseFailureInterceptor = async (error, reduxStore) => {
    if (error.response) {
      console.log('error occurred ');
      console.log(error);
      return Promise.reject(error.response);
    }

    const connectionStatus = await checkInternetConnection();
    switch (connectionStatus) {
      case ConnectionStatus.ONLINE:
        reduxStore.dispatch(serverDown());
        break;
      case ConnectionStatus.OFFLINE:
        reduxStore.dispatch(networkDown());
        break;
      case ConnectionStatus.INTERNET_PROBLEM:
        reduxStore.dispatch(internetDown());
        break;
    }
    return Promise.reject('Connection error');
  };

}

export default BaseAPI;
