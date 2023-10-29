import {FILMS_COUNT_PER_STEP} from '../const.js';
import {render, remove} from '../framework/render.js';

import SortingView from '../view/sorting-view.js';
import filmsSectionView from '../view/films-section-view.js';
import FilmsListOuterView from '../view/films-list-outer-view.js';
import NoFilmsView from '../view/no-films-view.js';
import FilmsListInnerView from '../view/films-list-inner-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupView from '../view/popup-view.js';


export default class BoardPresenter {
  #sortingComponent = new SortingView();
  #filmsSectionComponent = new filmsSectionView();
  #filmsListOuterComponent = new FilmsListOuterView();
  #filmsListInnerComponent = new FilmsListInnerView();
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
      render(this.#filmsSectionComponent, this.#boardContainer);
      render(new NoFilmsView(), this.#filmsSectionComponent.element);
      return;
    }

    render(this.#sortingComponent, this.#boardContainer);
    render(this.#filmsSectionComponent, this.#boardContainer);
    render(this.#filmsListOuterComponent, this.#filmsSectionComponent.element);
    render(this.#filmsListInnerComponent, this.#filmsListOuterComponent.element);

    this.#films
      .slice(0, Math.min(this.#films.length, FILMS_COUNT_PER_STEP))
      .forEach((film) => this.#renderFilmCard(film, this.#filmsListInnerComponent.element));

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#filmsListOuterComponent.element);
      this.#showMoreButtonComponent.setClickHandler(this.#showMoreButtonClickhandler);
    }
  };


  #showMoreButtonClickhandler = () => {
    this.#films
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilmCard(film, this.#filmsListInnerComponent.element));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };


  #renderFilmCard = (film, container) => {
    const filmCardComponent = new FilmCardView(film);
    filmCardComponent.setFilmCardClickHandler(() => {
      this.#addFilmPopupComponent(film);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    });

    render(filmCardComponent, container);
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


  #addFilmPopupComponent = (film) => {
    this.#renderFilmPopup(film);
    document.body.classList.add('hide-overflow');
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
