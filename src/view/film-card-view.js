import AbstractView from '../framework/view/abstract-view.js';
import {getCorrectYear, getCorrectRuntime} from '../utils/film.js';


const CONTROL_ITEM_ACTIVE_CLASS_NAME = 'film-card__controls-item--active';


const getCorrectClassName = (prop) => prop ? CONTROL_ITEM_ACTIVE_CLASS_NAME : '';


const getShortDescription = (description) => {
  if (description.length >= 140) {
    return `${description.slice(0, 139)}…`;
  }
  return description;
};


const createFilmCardTemplate = (film) => {
  const {comments} = film;
  const {watchlist, alreadyWatched, favorite} = film.userDetails;
  const {title, release: {date}, runtime, genre, description, totalRating, poster} = film.filmInfo;

  return `
  <article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${getCorrectYear(date)}</span>
        <span class="film-card__duration">${getCorrectRuntime(runtime)}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${getShortDescription(description)}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${getCorrectClassName(watchlist)}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${getCorrectClassName(alreadyWatched)}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${getCorrectClassName(favorite)}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};


export default class FilmCardView extends AbstractView {
  #film = null;


  constructor(film) {
    super();
    this.#film = film;
  }


  get template() {
    return createFilmCardTemplate(this.#film);
  }


  setFilmCardClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  };


  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };


  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#addToWatchlistClickHandler);
  };


  #addToWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  };


  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };


  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };


  setAddToFavoritesClickHandler = (callback) => {
    this._callback.addToFavoritesClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#addToFavoritesClickHandler);
  };


  #addToFavoritesClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToFavoritesClick();
  };
}
