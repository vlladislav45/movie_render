import axios from 'axios';
import {
  finishedRequest,
  initiatedRequest,
  internetDown,
  networkDown,
  serverDown,
} from 'reducers/connectionReducer';
import {
  checkInternetConnection,
  ConnectionStatus,
} from 'utils/apiUtils';
import { JWT_TOKEN } from 'config/authConstants';

const API_SERVER = 'http://localhost';
// const API_SERVER = 'http://192.168.0.104';
const API_PORT = '8080';
export const API_URL = `${API_SERVER}:${API_PORT}/`;

//TODO: Revert back to reasonable amount of time
export const RETRY_CONNECTION_TIMEOUT = 1000000;

//TODO: maybe i dont need to save unfinished requests
// because i cannot execute their callbacks
class BaseAPI {
  
  constructor() {
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
  
  addInterceptors() {
    import('redux-store').then(module => {
      const { default: reduxStore } = module;
      
      this.api.interceptors.request.use(req => {
        const jwt = localStorage.getItem(JWT_TOKEN);
        if (jwt)
          req.headers['Authorization'] = `Bearer ${jwt}`;
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
  
  
  static request = req => axios.request(req);
  
  get = (url, options) => this.api.get(url, options);
  
  post = (url, data, options) => this.api.post(url, data, options);
  
  responseSuccessInterceptor = (response, reduxStore) => {
    reduxStore.dispatch(finishedRequest(response.config));
    return Promise.resolve(response);
  };
  
  responseFailureInterceptor = async (error, reduxStore) => {
    if (error.response) {
      const { response: { status, data } } = error;
      // Unauthorized
      if (status === 401) {
        // I cannot import at top level so im doing dynamic import
        // Since i dont expect this to happen so often (401 unauthorized)
        // I believe it will not make performance issues
        import('reducers/auth').then(module => {
          const { tokenExpired } = module;
          reduxStore.dispatch(tokenExpired());
        })
      }
      console.group('Request error');
      console.log(status);
      console.log(data);
      console.groupEnd();
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
