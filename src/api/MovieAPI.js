import BaseAPI from './BaseAPI';

class MovieAPI extends BaseAPI {

  getByPage = (page, size) => this.get(`/movies?count=${size}&offset=${page}`);

  getMoviesCount = () => this.get('/movies/count');

  getSingleMovie = movieId => this.get(`/movies/single/${movieId}`);

  getGenres = () => this.get('/movies/genres');

  getMoviesByFilter = (page, size, filter) => this.post(`/movies/filter?count=${size}&offset=${page}`, filter)
}

export default new MovieAPI();
