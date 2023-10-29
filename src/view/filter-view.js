import AbstractView from '../framework/view/abstract-view.js';
import {MAIN_NAVIGATION_ACTIVE_CLASS_NAME, ALL_MOVIES_FILTER_NAME, FilterType} from '../const.js';


const getFilterOption = ({name, count}, isActive) => {
  const activeClassName = isActive ? MAIN_NAVIGATION_ACTIVE_CLASS_NAME : '';
  const correctFilterName = name[0].toUpperCase() + name.slice(1);
  const countString = !isActive ? `<span class="main-navigation__item-count">${count}</span></a>` : '';

  if (name === FilterType.ALL) {
    return `<a href="#${name}" class="main-navigation__item ${activeClassName}">${ALL_MOVIES_FILTER_NAME} ${countString}`;
  }
  return `<a href="#${name}" class="main-navigation__item ${activeClassName}">${correctFilterName} ${countString}`;
};


const createFilterTemplate = (filters) => `
<nav class="main-navigation">
  ${filters.map((filter, index) => getFilterOption(filter, index === 0)).join('')}
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
