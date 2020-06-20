import BaseAPI from './BaseAPI';

class MovieAPI extends BaseAPI {
  getByPage = (page, size) => this.get(`/movies?count=${size}&offset=${page}`);

  getMoviesCount = () => this.get('/movies/count');

  getMoviePoster = poster => this.get(`/movie/poster?posterName=${poster}`);
}

export default new MovieAPI();