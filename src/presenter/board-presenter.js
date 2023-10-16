import {render} from '../render.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortingView from '../view/sorting-view.js';
import FilmsBoardView from '../view/films-board-view.js';
import FilmsListOuterView from '../view/films-list-outer-view.js';
import FilmsListInnerView from '../view/films-list-inner-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

export default class BoardPresenter {
  filmsBoardComponent = new FilmsBoardView();
  filmsListOuterComponent = new FilmsListOuterView();
  filmsListInnerComponent = new FilmsListInnerView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(new MainNavigationView(), this.boardContainer);
    render(new SortingView(), this.boardContainer);
    render(this.filmsBoardComponent, this.boardContainer);
    render(this.filmsListOuterComponent, this.filmsBoardComponent.getElement());
    render(this.filmsListInnerComponent, this.filmsListOuterComponent.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmsListInnerComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.filmsListOuterComponent.getElement());
  };
}
