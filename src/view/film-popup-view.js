import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getCorrectRuntime, getCorrectReleaseDate} from '../utils/film.js';
import {getFilmPopupCommentsTemplate} from './film-popup-comments-template.js';
import {getFilmPopupControlsTemplate} from './film-popup-controls-template.js';
import {getFilmPopupEmojisTemplate} from './film-popup-emojis-template.js';


const getGenresTemplate = (genres) => genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');


const getCurrentEmoji = (emotion) => emotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">` : '';


const createPopupTemplate = (state) => {
  const {userDetails, comment, checkedEmotion, comments} = state;
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
  } = state.filmInfo;

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
              ${getCurrentEmoji(checkedEmotion)}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment}</textarea>
            </label>

            <div class="film-details__emoji-list">
            ${getFilmPopupEmojisTemplate(checkedEmotion)}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};


export default class FilmPopupView extends AbstractStatefulView {
  constructor(film, comments, viewData, updateViewData) {
    super();
    this._state = FilmPopupView.parseFilmToState(
      film,
      comments,
      viewData.emotion,
      viewData.comment,
      viewData.scrollPosition
    );
    this.updateViewData = updateViewData;
    this.#setInnerHandlers();
  }


  get template() {
    return createPopupTemplate(this._state);
  }


  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputHandler);
    this.element.querySelector('.film-details__emoji-list').addEventListener('input', this.#commentEmojiChangeHandler);
  };


  _restoreHandlers = () => {
    this.setScrollPosition();
    this.#setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setAddToWatchlistClickHandler(this._callback.addToWatchlistClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setAddToFavoritesClickHandler(this._callback.addToFavoritesClick);
    this.setDeleteCommentClickHandler(this._callback.deleteCommentClick);
  };

  setScrollPosition = () => {
    this.element.scrollTop = this._state.scrollPosition;
  };


  static parseFilmToState = (
    film,
    comments,
    checkedEmotion = null,
    comment = '',
    scrollPosition = 0
  ) => ({
    ...film,
    comments,
    checkedEmotion,
    comment,
    scrollPosition,
  });


  #updateViewData = () => {
    this.updateViewData({
      emotion: this._state.checkedEmotion,
      comment: this._state.comment,
      scrollPosition: this.element.scrollTop,
    });
  };


  setCloseButtonClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeButtonClickHandler);
  };


  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#addToWatchlistClickHandler);
  };


  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };


  setAddToFavoritesClickHandler = (callback) => {
    this._callback.addToFavoritesClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#addToFavoritesClickHandler);
  };

  setDeleteCommentClickHandler = (callback) => {
    this._callback.deleteCommentClick = callback;
    this.element.querySelectorAll('.film-details__comment-delete').forEach((element) => element.addEventListener('click', this.#deleteCommentClickHandler));
  };


  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeButtonClick();
  };


  #addToWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.addToWatchlistClick();
  };


  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.alreadyWatchedClick();
  };


  #addToFavoritesClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.addToFavoritesClick();
  };


  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      comment: evt.target.value,
      scrollPosition: this.element.scrollTop,
    });
  };


  #commentEmojiChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.updateElement({
      checkedEmotion: evt.target.value,
      scrollPosition: this.element.scrollTop,
    });
  };


  #deleteCommentClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteCommentClick(evt.target.getAttribute('data-id'));
  };
}
