import {FILMS_COUNT_PER_STEP, SortType} from '../const.js';
import {updateItem} from '../utils/common.js';
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
  #showMoreButtonComponent = new ShowMoreButtonView();

  #boardContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #films = [];
  #selectedFilm = null;
  #filmPopupPresenter = null;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedFilms = [];
  #sortingComponent = null;


  constructor(boardContainer, filmsModel, commentsModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }


  init = () => {
    this.#films = [...this.#filmsModel.films];
    this.#sourcedFilms = [...this.#filmsModel.films];
    this.#renderBoard();
  };


  #renderBoard = () => {
    if (this.#films.length === 0) {
      this.#renderFilmsSection();
      this.#renderNoFilms();
      return;
    }
    this.#renderSorting();
    this.#renderFilmsSection();
    this.#renderAllMovies();
    this.#renderFilmsContainer(this.#allMoviesComponent.element);
    this.#renderFilms(0, Math.min(this.#films.length, FILMS_COUNT_PER_STEP), this.#filmsContainerComponent.element);
    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };


  #showMoreButtonClickhandler = () => {
    this.#renderFilms(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP, this.#filmsContainerComponent.element);
    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;
    if (this.#renderedFilmsCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };


  #renderFilms = (from, to, container) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilmCard(film, container));
  };


  #renderFilmCard = (film, container) => {
    const filmPresenter = new FilmPresenter(
      container,
      this.#filmChangeHandler,
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
        this.#filmChangeHandler,
        this.#removeFilmPopupComponent,
        this.#escKeyDownHandler,
      );
    }
    this.#filmPopupPresenter.init(this.#selectedFilm, comments);
  };


  #filmChangeHandler = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
    if (this.#filmPopupPresenter && this.#selectedFilm.id === updatedFilm.id) {
      this.#selectedFilm = updatedFilm;
      this.#renderFilmPopup();
    }
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


  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortFilmsByDate);
        break;
      case SortType.RATING:
        this.#films.sort(sortFilmsByRating);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }
    this.#currentSortType = sortType;
  };


  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortFilms(sortType);
    this.#clearFilmsList();
    this.#renderSorting();
    this.#renderFilms(0, Math.min(this.#films.length, FILMS_COUNT_PER_STEP), this.#filmsContainerComponent.element);
    if (this.#films.length > FILMS_COUNT_PER_STEP) {
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
    this.#showMoreButtonComponent.setClickHandler(this.#showMoreButtonClickhandler);
    render(this.#showMoreButtonComponent, this.#allMoviesComponent.element);
  };
}
