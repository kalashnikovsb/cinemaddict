import {render, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import {UpdateType, UserAction} from '../const.js';


export default class FilmPresenter {
  #container = null;
  #filmComponent = null;
  #film = null;
  #changeData = null;
  #clickFilmHandler = null;
  #escKeyDownHandler = null;


  constructor(container, changeData, clickFilmHandler, escKeyDownHandler) {
    this.#container = container;
    this.#changeData = changeData;
    this.#clickFilmHandler = clickFilmHandler;
    this.#escKeyDownHandler = escKeyDownHandler;
  }


  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCardView(this.#film);

    this.#filmComponent.setFilmCardClickHandler(() => {
      this.#clickFilmHandler(this.#film);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    });

    this.#filmComponent.setAddToWatchlistClickHandler(this.#addToWatchlistClickHandler);
    this.#filmComponent.setAlreadyWatchedClickHandler(this.#alreadyWatchedClickHandler);
    this.#filmComponent.setAddToFavoritesClickHandler(this.#addToFavoritesClickHandler);

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#container);
      return;
    }
    if (this.#container.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }
    remove(prevFilmComponent);
  };


  destroy = () => {
    remove(this.#filmComponent);
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
      }
    );
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
      }
    );
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
      }
    );
  };
}
