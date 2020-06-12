import BaseAPI from './BaseAPI';

class MovieAPI extends BaseAPI {
  getByPage = (page, size) => this.get(`/movies?count=${size}&offset=${page}`);
}

export default new MovieAPI();