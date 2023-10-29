import {render} from '../src/framework/render.js';
import {getUserStatus} from './utils/film.js';
import {generateFilter} from './mock/filter.js';

import UserBlockView from './view/user-block-view.js';
import StatisticsView from './view/statistics-view.js';
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const headerElement = document.querySelector('.header');
const statisticsElement = document.querySelector('.footer__statistics');
const mainElement = document.querySelector('.main');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);
const filmsPresenter = new BoardPresenter(mainElement, filmsModel, commentsModel);

const userStatus = getUserStatus(filmsModel.films);
const filmsStatistics = filmsModel.films.length;
const filters = generateFilter(filmsModel.films);

render(new UserBlockView(userStatus), headerElement);
render(new StatisticsView(filmsStatistics), statisticsElement);
render(new FilterView(filters), mainElement);

filmsPresenter.init();
