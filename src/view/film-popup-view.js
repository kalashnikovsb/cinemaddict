import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getCorrectRuntime, getCorrectReleaseDate} from '../utils/film.js';
import {getFilmPopupCommentsTemplate} from './film-popup-comments-template.js';
import {getFilmPopupControlsTemplate} from './film-popup-controls-template.js';
import {getFilmPopupEmojisTemplate} from './film-popup-emojis-template.js';


const getGenresTemplate = (genres) => genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');


const getCurrentEmoji = (emotion) => emotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">` : '';


const createPopupTemplate = (film, comments, state) => {
  const {userDetails} = film;
  const {
    poster,
    title,
    alternativeTitle,
    totalRating,
    ageRating,
    director,
    writers,
    genre,
    actors,
    description,
    runtime,
    release: {releaseCountry, date},
  } = film.filmInfo;
  const {comment, emotion} = state;

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${getCorrectReleaseDate(date)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getCorrectRuntime(runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${getGenresTemplate(genre)}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        ${getFilmPopupControlsTemplate(userDetails)}
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
          ${getFilmPopupCommentsTemplate(comments)}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${getCurrentEmoji(emotion)}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment}</textarea>
            </label>

            <div class="film-details__emoji-list">
            ${getFilmPopupEmojisTemplate(emotion)}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};


export default class FilmPopupView extends AbstractStatefulView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
    this._state = {
      comment: '',
      emotion: '',
      pageYOffset: 0,
    };

    this.#setInnerHandlers();
  }


  get template() {
    return createPopupTemplate(this.#film, this.#comments, this._state);
  }


  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputHandler);
    this.element.querySelector('.film-details__emoji-list').addEventListener('input', this.#commentEmojiChangeHandler);
  };


  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };


  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      comment: evt.target.value,
      // pageYOffset: window.scrollY,
    });
    console.log(this._state);
    console.log(window.scrollY);
  };


  #commentEmojiChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.updateElement({
      emotion: evt.target.value,
      // pageYOffset: window.scrollY,
    });
    console.log(this._state);
    console.log(window.scrollY);
  };


  setCloseButtonClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeButtonClickHandler);
  };


  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeButtonClick();
  };


  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#addToWatchlistClickHandler);
  };


  #addToWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  };


  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };


  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };


  setAddToFavoritesClickHandler = (callback) => {
    this._callback.addToFavoritesClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#addToFavoritesClickHandler);
  };


  #addToFavoritesClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToFavoritesClick();
  };
}
