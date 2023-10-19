import {createElement} from '../render.js';
import {getCorrectYear, getCorrectRuntime} from '../utils.js';

const getShortDescription = (description) => {
  if (description.length >= 140) {
    return `${description.slice(0, 139)}…`;
  }
  return description;
};

const createFilmCardTemplate = (film) => {
  const {comments} = film;
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
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${getShortDescription(description)}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCardView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
