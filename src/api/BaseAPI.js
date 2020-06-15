import axios from 'axios';


const API_SERVER = 'http://192.168.1.13';
const API_PORT = '8090';
const API_URL = `${API_SERVER}:${API_PORT}/`;

class BaseAPI {

  constructor() {
    this.initialize();
  }

  initialize = () => {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    });
  };

  get = (url, options) => this.api.get(url, options);

  post = (url, data, options) => this.api.post(url, data, options);
}

export default BaseAPI;