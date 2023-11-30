import ApiService from './framework/api-service.js';


const Method = {
  GET: 'GET',
  PUT: 'PUT',
};


export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }


  updateFilm = async (film) => {
    const response = await this._load({
      url: '',
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });


    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };


  #adaptToServer = (film) => {
    const adaptedFilm = {
      'id': film.id,
      'comments': film.comments,
      'film_info': {
        'title': film.filmInfo.title,
        'alternative_title': film.filmInfo.alternativeTitle,
        'total_rating': film.filmInfo.totalRating,
        'poster': film.filmInfo.poster,
        'age_rating': film.filmInfo.ageRating,
        'director': film.filmInfo.director,
        'writers': film.filmInfo.writers,
        'actors': film.filmInfo.actors,
        'release': {
          'date': film.filmInfo.release.date,
          'release_country': film.filmInfo.release.releaseCountry,
        },
        'runtime': film.filmInfo.runtime,
        'genre': film.filmInfo.genre,
        'description': film.filmInfo.description,
      },
      'user_details': {
        'watchlist': film.userDetails.watchlist,
        'alreadyWatched': film.userDetails.alreadyWatched,
        'watchingDate': film.userDetails.watchingDate,
        'favorite': film.userDetails.favorite,
      },
    };
    return adaptedFilm;
  };
}
