import {FILMS_COUNT_PER_STEP} from '../const.js';
import {render, remove} from '../framework/render.js';
import SortingView from '../view/sorting-view.js';
import FilmsSectionView from '../view/films-section-view.js';
import AllMoviesView from '../view/all-movies-view.js';
import NoFilmsView from '../view/no-films-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupView from '../view/popup-view.js';


export default class BoardPresenter {
  #sortingComponent = new SortingView();
  #filmsSectionComponent = new FilmsSectionView();
  #allMoviesComponent = new AllMoviesView();
  #filmsContainerComponent = new FilmsContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #boardContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filmPopupComponent = null;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #films = [];


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


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmPopupComponent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };


  #addFilmPopupComponent = (film) => {
    this.#renderFilmPopup(film);
    document.body.classList.add('hide-overflow');
  };


  #removeFilmPopupComponent = () => {
    remove(this.#filmPopupComponent);
    this.#filmPopupComponent = null;
    document.body.classList.remove('hide-overflow');
  };


  #renderFilmPopup = (film) => {
    if (this.#filmPopupComponent) {
      this.#removeFilmPopupComponent();
    }
    const comments = [...this.#commentsModel.getComments(film)];
    this.#filmPopupComponent = new PopupView(film, comments);
    this.#filmPopupComponent.setCloseButtonClickHandler(() => {
      this.#removeFilmPopupComponent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    });
    render(this.#filmPopupComponent, this.#boardContainer.parentElement);
  };


  #renderFilms = (from, to, container) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilmCard(film, container));
  };


  #renderFilmCard = (film, container) => {
    const filmCardComponent = new FilmCardView(film);
    filmCardComponent.setFilmCardClickHandler(() => {
      this.#addFilmPopupComponent(film);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    });
    render(filmCardComponent, container);
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
