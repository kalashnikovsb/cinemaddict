import {render} from '../render.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortingView from '../view/sorting-view.js';
import FilmsBoardView from '../view/films-board-view.js';
import FilmsListOuterView from '../view/films-list-outer-view.js';
import FilmsListInnerView from '../view/films-list-inner-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupView from '../view/popup-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #filmsModel = null;
  #commentsModel = null;

  #mainNavigationComponent = new MainNavigationView();
  #sortingComponent = new SortingView();
  #filmsBoardComponent = new FilmsBoardView();
  #filmsListOuterComponent = new FilmsListOuterView();
  #filmsListInnerComponent = new FilmsListInnerView();

  #films = [];

  init = (boardContainer, filmsModel, commentsModel) => {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#films = [...this.#filmsModel.films];

    render(this.#mainNavigationComponent, this.#boardContainer);
    render(this.#sortingComponent, this.#boardContainer);
    render(this.#filmsBoardComponent, this.#boardContainer);
    render(this.#filmsListOuterComponent, this.#filmsBoardComponent.element);
    render(this.#filmsListInnerComponent, this.#filmsListOuterComponent.element);

    for (let i = 0; i < this.#films.length; i++) {
      const currentFilm = this.#films[i];
      const comments = [...this.#commentsModel.getComments(currentFilm)];
      this.#renderFilmCard(this.#films[i], comments);
    }

    render(new ShowMoreButtonView(), this.#filmsListOuterComponent.element);
  };

  #renderFilmCard = (film, comments) => {
    const filmCardComponent = new FilmCardView(film);
    const filmPopupComponent = new PopupView(film, comments);

    const openPopupElement = filmCardComponent.element.querySelector('.film-card__link');
    const closePopupElement = filmPopupComponent.element.querySelector('.film-details__close-btn');

    render(filmCardComponent, this.#filmsListInnerComponent.element);

    const openPopup = () => {
      this.#boardContainer.parentElement.appendChild(filmPopupComponent.element);
      document.body.classList.add('hide-overflow');
    };

    const closePopup = () => {
      this.#boardContainer.parentElement.removeChild(filmPopupComponent.element);
      document.body.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    openPopupElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

    closePopupElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });
  };
}
