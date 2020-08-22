import BaseAPI from './BaseAPI';

class ReviewsAPI extends BaseAPI {
  rateMovie = data => this.post(`movies/single/rating`, data);
  
  getReviewsByAuthor = authorId => this.get(`user/userInfo/reviewsByAuthor?userId=${authorId}`);
  
  getReviewsByMovie = (movieId, page = 0, size = 5) => this.get(`/movies/single/reviewsByMovie?movieId=${movieId}&page=${page}&size=${size}`);
  
  getReviewsByAuthorAndMovie = (authorId, movieId) => this.get(`/movies/single/reviewByAuthorAndMovie?userId=${authorId}&movieId=${movieId}`);
}

export default new ReviewsAPI();
