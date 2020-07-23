import BaseAPI from './BaseAPI';

class MovieAPI extends BaseAPI {

  getMoviesCount = filters => this.post('/movies/count', filters);

  getSingleMovie = movieId => this.get(`/movies/single/${movieId}`);

  getGenres = () => this.get('/movies/genres');

  getByPage = (page, size, filter) => this.post(`/movies?size=${size}&page=${page}`, filter);

  rateMovie = data => this.post(`movies/single/rating`, data);
}

export default new MovieAPI();
