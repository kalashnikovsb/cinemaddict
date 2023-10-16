import {render} from './render.js';
import UserBlockView from './view/user-block-view.js';
import FilmsNumberView from './view/films-number-view.js';
import BoardPresenter from './presenter/board-presenter.js';

const headerElement = document.querySelector('.header');
const statisticsElement = document.querySelector('.footer__statistics');
const mainElement = document.querySelector('.main');

render(new UserBlockView(), headerElement);
render(new FilmsNumberView(), statisticsElement);

const boardPresenter = new BoardPresenter();
boardPresenter.init(mainElement);
