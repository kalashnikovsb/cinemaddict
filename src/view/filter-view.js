import AbstractView from '../framework/view/abstract-view.js';
import {MAIN_NAVIGATION_ACTIVE_CLASS_NAME, ALL_MOVIES_FILTER_NAME, FilterType} from '../const.js';

const getFilterOption = ({name, count}, isActive) => {
  const activeClassName = isActive ? MAIN_NAVIGATION_ACTIVE_CLASS_NAME : '';
  const countString = !isActive ? `<span class="main-navigation__item-count">${count}</span></a>` : '';

  if (name === FilterType.ALL) {
    return `<a href="#${name}" class="main-navigation__item ${activeClassName}">${ALL_MOVIES_FILTER_NAME} ${countString}`;
  }
  return `<a href="#${name}" class="main-navigation__item ${activeClassName}">${(name[0].toUpperCase() + name.slice(1))} ${countString}`;
};

const createFilterTemplate = (filters) => `
<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
</nav>`;

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
