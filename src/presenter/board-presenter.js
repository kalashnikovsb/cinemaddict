import {render} from '../render.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortingView from '../view/sorting-view.js';
import FilmsBoardView from '../view/films-board-view.js';
import FilmsListOuterView from '../view/films-list-outer-view.js';
import NoFilmsView from '../view/no-films-view.js';
import FilmsListInnerView from '../view/films-list-inner-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupView from '../view/popup-view.js';

const FILMS_COUNT_PER_STEP = 5;


export default class BoardPresenter {
  #boardContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filmPopupComponent = null;

  #mainNavigationComponent = new MainNavigationView();
  #sortingComponent = new SortingView();
  #filmsBoardComponent = new FilmsBoardView();
  #filmsListOuterComponent = new FilmsListOuterView();
  #filmsListInnerComponent = new FilmsListInnerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #films = [];
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;


  init = (boardContainer, filmsModel, commentsModel) => {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#films = [...this.#filmsModel.films];

    render(this.#mainNavigationComponent, this.#boardContainer);
    render(this.#filmsBoardComponent, this.#boardContainer);

    if (!this.#films.length) {
      render(new NoFilmsView(), this.#filmsBoardComponent.element);
    } else {
      render(this.#sortingComponent, this.#boardContainer);
      render(this.#filmsListOuterComponent, this.#filmsBoardComponent.element);
      render(this.#filmsListInnerComponent, this.#filmsListOuterComponent.element);

      for (let i = 0; i < Math.min(this.#films.length, FILMS_COUNT_PER_STEP); i++) {
        this.#renderFilmCard(this.#films[i], this.#filmsListInnerComponent.element);
      }

      if (this.#films.length > FILMS_COUNT_PER_STEP) {
        render(this.#showMoreButtonComponent, this.#filmsListOuterComponent.element);
        this.#showMoreButtonComponent.element.addEventListener('click', this.#onShowMoreButtonClick);
      }
    }
  };


  #onShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#films
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilmCard(film, this.#filmsListInnerComponent.element));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };


  #renderFilmCard = (film, container) => {
    const filmCardComponent = new FilmCardView(film);
    const openPopupElement = filmCardComponent.element.querySelector('.film-card__link');

    openPopupElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#addFilmPopupComponent(film);
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    render(filmCardComponent, container);
  };


  #renderFilmPopup = (film) => {
    if (this.#filmPopupComponent) {
      this.#removeFilmPopupComponent();
    }

    const comments = [...this.#commentsModel.getComments(film)];

    this.#filmPopupComponent = new PopupView(film, comments);

    const closePopupElement = this.#filmPopupComponent.element.querySelector('.film-details__close-btn');

    closePopupElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#removeFilmPopupComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    render(this.#filmPopupComponent, this.#boardContainer.parentElement);
  };


  #addFilmPopupComponent = (film) => {
    this.#renderFilmPopup(film);
    document.body.classList.add('hide-overflow');
  };


  #removeFilmPopupComponent = () => {
    this.#filmPopupComponent.element.remove();
    this.#filmPopupComponent = null;
    document.body.classList.remove('hide-overflow');
  };


  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmPopupComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
