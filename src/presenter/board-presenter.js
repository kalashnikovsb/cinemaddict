import {FILMS_COUNT_PER_STEP, SortType} from '../const.js';
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
  #selectedFilm = null;
  #filmPopupPresenter = null;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sortingComponent = null;


  constructor(boardContainer, filmsModel, commentsModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }


  init = () => {
    this.#renderBoard();
  };


  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //


  get films() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmsModel.films].sort(sortFilmsByDate);
      case SortType.RATING:
        return [...this.#filmsModel.films].sort(sortFilmsByRating);
    }
    return this.#filmsModel.films;
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


  #filmChangeHandler = (updatedFilm) => {
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
    if (this.#filmPopupPresenter && this.#selectedFilm.id === updatedFilm.id) {
      this.#selectedFilm = updatedFilm;
      this.#renderFilmPopup();
    }
  };


  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearFilmsList();
    this.#renderSorting();
    this.#renderFilmsList();
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
    this.#renderFilmsList();
  };


  #renderFilmsList = () => {
    const filmsCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmsCount, FILMS_COUNT_PER_STEP));
    this.#renderFilms(films, this.#filmsContainerComponent.element);
    if (filmsCount > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };


  #renderFilms = (films, container) => films.forEach((film) => this.#renderFilmCard(film, container));


  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //


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


  #removeFilmPopupComponent = () => {
    this.#filmPopupPresenter.destroy();
    this.#filmPopupPresenter = null;
    this.#selectedFilm = null;
    document.body.classList.remove('hide-overflow');
  };


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmPopupComponent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };


  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
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
    this.#showMoreButtonComponent.setClickHandler(this.#showMoreButtonClickHandler);
    render(this.#showMoreButtonComponent, this.#allMoviesComponent.element);
  };
}
