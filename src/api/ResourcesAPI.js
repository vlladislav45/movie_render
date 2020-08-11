import BaseAPI from './BaseAPI';

/**
 * This is needed only to add the authorization header when fetching resources
 * (images, movies etc)
 */
class ResourcesAPI extends BaseAPI {
  fetchResource = url => this.get(url, { responseType: 'blob'});
}

export default new ResourcesAPI();
