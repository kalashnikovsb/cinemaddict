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
  filmsBoardComponent = new FilmsBoardView();
  filmsListOuterComponent = new FilmsListOuterView();
  filmsListInnerComponent = new FilmsListInnerView();

  init = (boardContainer, filmsModel) => {
    this.boardContainer = boardContainer;
    this.filmsModel = filmsModel;
    this.boardFilms = [...this.filmsModel.getFilms()];

    render(new MainNavigationView(), this.boardContainer);
    render(new SortingView(), this.boardContainer);
    render(this.filmsBoardComponent, this.boardContainer);
    render(this.filmsListOuterComponent, this.filmsBoardComponent.getElement());
    render(this.filmsListInnerComponent, this.filmsListOuterComponent.getElement());

    for (let i = 0; i < this.boardFilms.length; i++) {
      render(new FilmCardView(this.boardFilms[i]), this.filmsListInnerComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.filmsListOuterComponent.getElement());
    render(new PopupView(this.boardFilms[0]), this.boardContainer.parentElement);

  };
}
