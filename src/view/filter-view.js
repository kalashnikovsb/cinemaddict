import AbstractView from '../framework/view/abstract-view.js';
import {MAIN_NAVIGATION_ACTIVE_CLASS_NAME} from '../const.js';


const getFilterOption = ({type, name: label, count}, currentFilter) => {
  const activeClassName = (type === currentFilter) ? MAIN_NAVIGATION_ACTIVE_CLASS_NAME : '';
  const countString = !(type === currentFilter) ? `<span class="main-navigation__item-count">${count}</span></a>` : '';
  return `<a href="#${type}" data-filter-type="${type}" class="main-navigation__item ${activeClassName}">${label}${countString}`;
};


const createFilterTemplate = (filters, currentFilter) => `
<nav class="main-navigation">
  ${filters.map((filter) => getFilterOption(filter, currentFilter)).join('')}
</nav>`;


export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;


  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }


  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }


  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };


  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'A') {
      return;
    }
    this._callback.filterTypeChange(evt.target.getAttribute('data-filter-type'));
  };
}
