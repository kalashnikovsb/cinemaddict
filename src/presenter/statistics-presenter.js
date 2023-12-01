import StatisticsView from '../view/statistics-view.js';
import {remove, render, replace} from '../framework/render.js';
import {UpdateType} from '../const.js';

export default class StatisticsPresenter {
  #container = null;
  #statisticsComponent = null;
  #filmsModel = null;
  #filmCount = null;

  constructor(container, filmModel) {
    this.#container = container;
    this.#filmsModel = filmModel;
    this.#filmsModel.addObserver(this.#modelEventHandler);
  }

  init() {
    this.#filmCount = this.#filmsModel.get().length;
    const prevStatisticsComponent = this.#statisticsComponent;
    this.#statisticsComponent = new StatisticsView(this.#filmCount);

    if (prevStatisticsComponent === null) {
      render(this.#statisticsComponent, this.#container);
      return;
    }

    replace(this.#statisticsComponent, prevStatisticsComponent);
    remove(prevStatisticsComponent);
  }

  #modelEventHandler = (updateType) => {
    if (updateType === UpdateType.INIT) {
      this.init();
    }
  };
}
