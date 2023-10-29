import AbstractView from '../framework/view/abstract-view.js';

const createStatisticsTemplate = (statistics) => `<p>${statistics} movies inside</p>`;

export default class StatisticsView extends AbstractView {
  #statistics = null;

  constructor(statistics) {
    super();
    this.#statistics = statistics;
  }

  get template() {
    return createStatisticsTemplate(this.#statistics);
  }
}
