import {FILMS_COUNT_PER_STEP, SortType, UpdateType, UserAction} from '../const.js';
import {sortFilmsByDate, sortFilmsByRating} from '../utils/film.js';
import {render, remove, replace} from '../framework/render.js';
import SortingView from '../view/sorting-view.js';
import FilmsSectionView from '../view/films-section-view.js';
import AllMoviesView from '../view/all-movies-view.js';
import NoFilmsView from '../view/no-films-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmPresenter from './film-presenter.js';
import FilmPopupPresenter from './film-popup-presenter.js';


export default class BoardPresenter {

  #filmsSectionComponent = new FilmsSectionView();
  #allMoviesComponent = new AllMoviesView();
  #filmsContainerComponent = new FilmsContainerView();

  #boardContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #selectedFilm = null;
  #filmPopupPresenter = null;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sortingComponent = null;
  #showMoreButtonComponent = null;


  constructor(boardContainer, filmsModel, commentsModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#filmsModel.addObserver(this.#filmModelEventHandler);
  }





  #filmViewActionHandler = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
    }
  };

  #filmModelEventHandler = (updateType, data) => {
    switch(updateType) {
      case UpdateType.MAJOR:
        // this.#filmPresenter.get(data.id).init(data);
        // if (this.#filmPopupPresenter && this.#selectedFilm.id === data.id) {
        //   this.#selectedFilm = data;
        //   this.#renderFilmPopup();
        // }
      this.#clearBoard({resetRenderedFilmsCount: true, resetSortType: true});
      this.#renderBoard();
      break;
    }
  };











  init = () => {
    this.#renderBoard();
  };


  #renderBoard = () => {

    if (this.films.length === 0) {
      this.#renderFilmsSection();
      this.#renderNoFilms();
      return;
    }
    this.#renderSorting();
    this.#renderFilmsSection();
    this.#renderAllMovies();
    this.#renderFilmsContainer(this.#allMoviesComponent.element);

    const filmsCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmsCount, FILMS_COUNT_PER_STEP));
    this.#renderFilms(films, this.#filmsContainerComponent.element);

    if (filmsCount > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };


  #clearBoard = ({resetRenderedFilmsCount = false, resetSortType = false} = {}) => {
    const filmsCount = this.films.length;
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    remove(this.#sortingComponent);
    remove(this.#filmsSectionComponent);
    remove(this.#allMoviesComponent);
    remove(this.#filmsContainerComponent);
    remove(this.#showMoreButtonComponent);
    if (resetRenderedFilmsCount) {
      this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    } else {
      this.#renderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };


  get films() {
    switch(this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmsModel.films].sort(sortFilmsByDate);
      case SortType.RATING:
        return [...this.#filmsModel.films].sort(sortFilmsByRating);
      default:
        return [...this.#filmsModel.films];
    }
  }


  #showMoreButtonClickHandler = () => {
    const filmsCount = this.films.length;
    const newRenderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmsCount, newRenderedFilmsCount);
    this.#renderFilms(films, this.#filmsContainerComponent.element);
    this.#renderedFilmsCount = newRenderedFilmsCount;
    if (this.#renderedFilmsCount >= filmsCount) {
      remove(this.#showMoreButtonComponent);
    }
  };


  #renderFilms = (films, container) => films.forEach((film) => this.#renderFilmCard(film, container));


  #renderFilmCard = (film, container) => {
    const filmPresenter = new FilmPresenter(
      container,
      this.#filmViewActionHandler,
      this.#addFilmPopupComponent,
      this.#escKeyDownHandler,
    );
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };


  #renderFilmPopup = () => {
    const comments = [...this.#commentsModel.get(this.#selectedFilm)];
    if (!this.#filmPopupPresenter) {
      this.#filmPopupPresenter = new FilmPopupPresenter(
        this.#boardContainer.parentElement,
        this.#filmViewActionHandler,
        this.#removeFilmPopupComponent,
        this.#escKeyDownHandler,
      );
    }
    this.#filmPopupPresenter.init(this.#selectedFilm, comments);
  };


  #addFilmPopupComponent = (film) => {
    if (this.#selectedFilm && this.#selectedFilm.id === film.id) {
      return;
    }
    if (this.#selectedFilm && this.#selectedFilm.id !== film.id) {
      this.#removeFilmPopupComponent();
    }
    this.#selectedFilm = film;
    this.#renderFilmPopup();
    document.body.classList.add('hide-overflow');
  };


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmPopupComponent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };


  #removeFilmPopupComponent = () => {
    this.#filmPopupPresenter.destroy();
    this.#filmPopupPresenter = null;
    this.#selectedFilm = null;
    document.body.classList.remove('hide-overflow');
  };


  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };


  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedFilmsCount: true});
    this.#renderBoard();

    const filmsCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmsCount, FILMS_COUNT_PER_STEP));
    this.#renderFilms(films, this.#filmsContainerComponent.element);

    if (filmsCount > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };


  #renderSorting = () => {
    if (!this.#sortingComponent) {
      this.#sortingComponent = new SortingView(this.#currentSortType);
      render(this.#sortingComponent, this.#boardContainer);
    } else {
      const updatedSortingComponent = new SortingView(this.#currentSortType);
      replace(updatedSortingComponent, this.#sortingComponent);
      this.#sortingComponent = updatedSortingComponent;
    }
    this.#sortingComponent.setSortTypeChangeHandler(this.#sortTypeChangeHandler);
  };


  #renderFilmsSection = () => {
    render(this.#filmsSectionComponent, this.#boardContainer);
  };


  #renderAllMovies = () => {
    render(this.#allMoviesComponent, this.#filmsSectionComponent.element);
  };


  #renderFilmsContainer = (container) => {
    render(this.#filmsContainerComponent, container);
  };


  #renderNoFilms = () => {
    render(new NoFilmsView(), this.#filmsSectionComponent.element);
  };


  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    this.#showMoreButtonComponent.setClickHandler(this.#showMoreButtonClickHandler);
    render(this.#showMoreButtonComponent, this.#allMoviesComponent.element);
  };
}
