import BaseAPI from './BaseAPI';

class ReviewsAPI extends BaseAPI {
  rateMovie = data => this.post(`movies/single/rating`, data);
  
  getReviewsByAuthor = authorId => this.get(`user/userInfo/reviewsByAuthor?userId=${authorId}`);
  
  getReviewsByMovie = movieId => this.get(`/movies/single/reviewsByMovie?movieId=${movieId}`);
  
  getReviewsByAuthorAndMovie = (authorId, movieId) => this.get(`/movies/single/reviewByAuthorAndMovie?userId=${authorId}&movieId=${movieId}`);
}

export default new ReviewsAPI();
