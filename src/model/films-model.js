import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';


export default class FilmsModel extends Observable {
  #films = [];
  #apiService = null;


  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }


  init = async () => {
    try {
      const films = await this.#apiService.get();
      this.#films = films.map(this.#adaptToClient);
    } catch {
      this.#films = [];
    }
    this._notify(UpdateType.INIT);
  };


  get = () => this.#films;


  update = async (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }
    try {
      const response = await this.#apiService.updateFilm(update);
      const updatedFilm = this.#adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, index),
        updatedFilm,
        ...this.#films.slice(index + 1)
      ];
      this._notify(updateType, updatedFilm);
    } catch(err) {
      throw new Error('Can\'t update film');
    }
  };


  #adaptToClient = (film) => {
    const adaptedFilm = {
      'id': film.id,
      'comments': film.comments,
      'filmInfo': {
        'title': film.film_info.title,
        'alternativeTitle': film.film_info.alternative_title,
        'totalRating': film.film_info.total_rating,
        'poster': film.film_info.poster,
        'ageRating': film.film_info.age_rating,
        'director': film.film_info.director,
        'writers': film.film_info.writers,
        'actors': film.film_info.actors,
        'release': {
          'date': film.film_info.release.date,
          'releaseCountry': film.film_info.release.release_country,
        },
        'runtime': film.film_info.runtime,
        'genre': film.film_info.genre,
        'description': film.film_info.description,
      },
      'userDetails': {
        'watchlist': film.user_details.watchlist,
        'alreadyWatched': film.user_details.already_watched,
        'watchingDate': film.user_details.watching_date,
        'favorite': film.user_details.favorite,
      },
    };
    return adaptedFilm;
  };
}
