import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import UserBlockPresenter from './presenter/user-block-presenter.js';
import StatisticsPresenter from './presenter/statistics-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import FilmsApiService from './api-services/films-api-service.js';
import CommentsApiService from './api-services/comments-api-service.js';

const AUTHORIZATION = 'Basic 1234567890QAZxsw';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const headerElement = document.querySelector('.header');
const statisticsElement = document.querySelector('.footer__statistics');
const mainElement = document.querySelector('.main');

const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter(mainElement, filmsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);
const userBlockPresenter = new UserBlockPresenter(headerElement, filmsModel);
const statisticsPresenter = new StatisticsPresenter(statisticsElement, filmsModel);

userBlockPresenter.init();
statisticsPresenter.init();
filterPresenter.init();
boardPresenter.init();
filmsModel.init();
