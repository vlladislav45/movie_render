import BaseAPI from './BaseAPI';

class MovieAPI extends BaseAPI {

  getByPage = (page, size) => this.get(`/movies?count=${size}&offset=${page}`);

  getMoviesCount = () => this.get('/movies/count');

  getSingleMovie = movieId => this.get(`/movies/single/${movieId}`);

  getStream = movieId => this.get('/stream/mp4/Kenpachi');

  getGenres = () => this.get('/movies/genres');
}

export default new MovieAPI();
