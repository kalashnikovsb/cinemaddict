import {remove, replace, render} from '../framework/render.js';
import FilmPopupView from '../view/film-popup-view.js';
import {UpdateType, UserAction} from '../const.js';


export default class filmPopupPresenter {
  #container = null;
  #changeData = null;
  #closeButtonClickHandler = null;
  #escKeyDownHandler = null;
  #filmPopupComponent = null;
  #film = null;
  #comments = null;
  #viewData = {
    emotion: null,
    comment: '',
    scrollPosition: 0,
  };


  constructor(container, changeData, closeButtonClickHandler, escKeyDownHandler) {
    this.#container = container;
    this.#changeData = changeData;
    this.#closeButtonClickHandler = closeButtonClickHandler;
    this.#escKeyDownHandler = escKeyDownHandler;
  }


  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;

    const prevFilmPopupComponent = this.#filmPopupComponent;

    this.#filmPopupComponent = new FilmPopupView(
      this.#film,
      this.#comments,
      this.#viewData,
      this.#updateViewData,
    );

    this.#filmPopupComponent.setCloseButtonClickHandler(() => {
      this.#closeButtonClickHandler();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    });

    this.#filmPopupComponent.setAddToWatchlistClickHandler(this.#addToWatchlistClickHandler);
    this.#filmPopupComponent.setAlreadyWatchedClickHandler(this.#alreadyWatchedClickHandler);
    this.#filmPopupComponent.setAddToFavoritesClickHandler(this.#addToFavoritesClickHandler);

    if (prevFilmPopupComponent === null) {
      render(this.#filmPopupComponent, this.#container);
      return;
    }
    if (this.#container.contains(prevFilmPopupComponent.element)) {
      replace(this.#filmPopupComponent, prevFilmPopupComponent);
      this.#filmPopupComponent.setScrollPosition();
    }
    remove(prevFilmPopupComponent);
  };


  #updateViewData = (viewData) => {
    this.#viewData = {...viewData};
  };


  destroy = () => {
    remove(this.#filmPopupComponent);
  };


  #addToWatchlistClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MAJOR,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          watchlist: !this.#film.userDetails.watchlist,
        },
      });
  };


  #alreadyWatchedClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MAJOR,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          alreadyWatched: !this.#film.userDetails.alreadyWatched,
        },
      });
  };


  #addToFavoritesClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MAJOR,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          favorite: !this.#film.userDetails.favorite,
        },
      });
  };
}
