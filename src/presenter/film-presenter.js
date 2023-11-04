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
  #comments = null;
  #changeData = null;


  constructor(filmContainer, boardContainer, commentsModel, changeData) {
    this.#filmContainer = filmContainer;
    this.#boardContainer = boardContainer;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
  }


  init = (film) => {
    this.#film = film;
    this.#comments = [...this.#commentsModel.getComments(film)];

    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCardView(this.#film);

    this.#filmComponent.setFilmCardClickHandler(() => {
      this.#addFilmPopupComponent(this.#film);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    });

    this.#filmComponent.setAddToWatchlistClickHandler(this.#addToWatchlistClickHandler);
    this.#filmComponent.setAlreadyWatchedClickHandler(this.#alreadyWatchedClickHandler);
    this.#filmComponent.setAddToFavoritesClickHandler(this.#addToFavoritesClickHandler);

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmContainer);
      return;
    }

    if (this.#filmContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  };


  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#filmPopupComponent);
  };


  #addFilmPopupComponent = () => {
    this.#renderFilmPopup();
    document.body.classList.add('hide-overflow');
  };


  #renderFilmPopup = () => {
    const prevFilmPopupComponent = this.#filmPopupComponent;

    this.#filmPopupComponent = new FilmPopupView(this.#film, this.#comments);

    this.#filmPopupComponent.setCloseButtonClickHandler(() => {
      this.#removeFilmPopupComponent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    });

    if (prevFilmPopupComponent === null) {
      render(this.#filmPopupComponent, this.#boardContainer.parentElement);
      return;
    }

    if (this.#boardContainer.contains(prevFilmPopupComponent.element)) {
      replace(this.#filmPopupComponent, prevFilmPopupComponent);
    }

    remove(prevFilmPopupComponent);
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


  #addToWatchlistClickHandler = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist,
      },
    });
  };


  #alreadyWatchedClickHandler = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      },
    });
  };


  #addToFavoritesClickHandler = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite,
      },
    });
  };
}
