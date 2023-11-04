import {FILMS_COUNT_PER_STEP} from '../const.js';
import {updateItem} from '../utils/common.js';
import {render, remove} from '../framework/render.js';
import SortingView from '../view/sorting-view.js';
import FilmsSectionView from '../view/films-section-view.js';
import AllMoviesView from '../view/all-movies-view.js';
import NoFilmsView from '../view/no-films-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmPresenter from './film-presenter.js';


export default class BoardPresenter {
  #sortingComponent = new SortingView();
  #filmsSectionComponent = new FilmsSectionView();
  #allMoviesComponent = new AllMoviesView();
  #filmsContainerComponent = new FilmsContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #boardContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #films = [];
  #filmPresenter = new Map();


  constructor(boardContainer, filmsModel, commentsModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }


  init = () => {
    this.#films = [...this.#filmsModel.films];
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
    const filmPresenter = new FilmPresenter(container, this.#boardContainer, this.#commentsModel, this.#filmChangeHandler);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };


  #filmChangeHandler = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };


  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };


  #renderSorting = () => {
    render(this.#sortingComponent, this.#boardContainer);
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


  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent.setClickHandler(this.#showMoreButtonClickhandler);
    render(this.#showMoreButtonComponent, this.#allMoviesComponent.element);
  };


  #renderNoFilms = () => {
    render(new NoFilmsView(), this.#filmsSectionComponent.element);
  };
}
