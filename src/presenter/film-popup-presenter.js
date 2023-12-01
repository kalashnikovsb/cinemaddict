import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../const.js';
import {remove, replace, render} from '../framework/render.js';
import FilmPopupView from '../view/film-popup-view.js';


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


  init = (film, comments, isCommentLoadingError) => {
    this.#film = film;
    this.#comments = (!isCommentLoadingError) ? comments : [];

    const prevFilmPopupComponent = this.#filmPopupComponent;

    this.#filmPopupComponent = new FilmPopupView(
      this.#film,
      this.#comments,
      this.#viewData,
      this.#updateViewData,
      isCommentLoadingError
    );

    this.#filmPopupComponent.setCloseButtonClickHandler(() => {
      this.#closeButtonClickHandler();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    });

    this.#filmPopupComponent.setAddToWatchlistClickHandler(this.#addToWatchlistClickHandler);
    this.#filmPopupComponent.setAlreadyWatchedClickHandler(this.#alreadyWatchedClickHandler);
    this.#filmPopupComponent.setAddToFavoritesClickHandler(this.#addToFavoritesClickHandler);

    if (!isCommentLoadingError) {
      this.#filmPopupComponent.setDeleteCommentClickHandler(this.#deleteCommentClickHandler);
    }

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


  clearViewData = () => {
    this.#updateViewData({
      comment: '',
      emotion: null,
      scrollPosition: this.#viewData.scrollPosition
    });
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


  #deleteCommentClickHandler = (commentId) => {
    const filmCommentIdIndex = this.#film.comments.findIndex((filmCommentId) => filmCommentId === commentId);
    const deletedComment = this.#comments.find((comment) => comment.id === commentId);
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {
        ...this.#film,
        comments: [
          ...this.#film.comments.slice(0, filmCommentIdIndex),
          ...this.#film.comments.slice(filmCommentIdIndex + 1)
        ]
      },
      deletedComment
    );
  };


  createComment = () => {
    this.#filmPopupComponent.setCommentData();
    const {emotion, comment} = this.#viewData;

    if (emotion && comment) {
      const newCommentId = nanoid();
      const createdComment = {
        id: newCommentId,
        author: 'Alexey',
        date: new Date(),
        emotion,
        comment
      };

      this.#changeData(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        {
          ...this.#film,
          comments: [
            ...this.#film.comments,
            newCommentId
          ]
        },
        createdComment
      );
    }
  };

}
