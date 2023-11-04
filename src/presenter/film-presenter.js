import {render, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupView from '../view/film-popup-view.js';


export default class FilmPresenter {
  #filmContainer = null;
  #boardContainer = null;
  #commentsModel = null;
  #filmComponent = null;
  #filmPopupComponent = null;
  #film = null;


  constructor(filmContainer, boardContainer, commentsModel) {
    this.#filmContainer = filmContainer;
    this.#boardContainer = boardContainer;
    this.#commentsModel = commentsModel;
  }


  init = (film) => {
    this.#film = film;
    this.#filmComponent = new FilmCardView(this.#film);
    this.#filmComponent.setFilmCardClickHandler(() => {
      this.#addFilmPopupComponent(this.#film);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    });
    render(this.#filmComponent, this.#filmContainer);
  };


  #addFilmPopupComponent = (film) => {
    this.#renderFilmPopup(film);
    document.body.classList.add('hide-overflow');
  };


  #renderFilmPopup = (film) => {
    const comments = [...this.#commentsModel.getComments(film)];
    this.#filmPopupComponent = new FilmPopupView(film, comments);
    this.#filmPopupComponent.setCloseButtonClickHandler(() => {
      this.#removeFilmPopupComponent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    });
    render(this.#filmPopupComponent, this.#boardContainer.parentElement);
  };


  #removeFilmPopupComponent = () => {
    remove(this.#filmPopupComponent);
    this.#filmPopupComponent = null;
    document.body.classList.remove('hide-overflow');
  };


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmPopupComponent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
