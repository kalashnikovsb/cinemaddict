import ApiService from '../framework/api-service.js';


export default class CommentsApiService extends ApiService {
  get = (film) => this._load({url: `comments/${film.id}`})
    .then(ApiService.parseResponse)
    .catch(() => null);
}
