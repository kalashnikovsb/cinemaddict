import {render} from './render.js';
import FilmsPresenter from './presenter/films-presenter.js';
import UserBlockView from './view/user-block-view.js';
import FilmsNumberView from './view/films-number-view.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const headerElement = document.querySelector('.header');
const statisticsElement = document.querySelector('.footer__statistics');
const mainElement = document.querySelector('.main');

render(new UserBlockView(), headerElement);
render(new FilmsNumberView(), statisticsElement);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filmsPresenter = new FilmsPresenter();
filmsPresenter.init(mainElement, filmsModel, commentsModel);
