import {render} from '../src/framework/render.js';
import {getUserStatus} from './utils/film.js';

import UserBlockView from './view/user-block-view.js';
import StatisticsView from './view/statistics-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const headerElement = document.querySelector('.header');
const statisticsElement = document.querySelector('.footer__statistics');
const mainElement = document.querySelector('.main');

const filters = [
  {
    type: 'all',
    name: 'All movies',
    count: 0,
  },
  {
    type: 'watchlist',
    name: 'Watchlist',
    count: 0,
  },
  {
    type: 'history',
    name: 'History',
    count: 0,
  },
  {
    type: 'favorites',
    name: 'Favorites',
    count: 0,
  },
];

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);
const boardPresenter = new BoardPresenter(mainElement, filmsModel, commentsModel);
const filterPresenter = new FilterPresenter(mainElement, FilterModel, FilmsModel, CommentsModel);

const userStatus = getUserStatus(filmsModel.films);
const filmsStatistics = filmsModel.films.length;

render(new UserBlockView(userStatus), headerElement);
render(new StatisticsView(filmsStatistics), statisticsElement);
// render(new FilterView(filters, 'all'), mainElement);

filterPresenter.init();
boardPresenter.init();
