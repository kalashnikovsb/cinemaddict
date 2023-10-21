import {createElement} from '../render.js';

const createFilmsListInnerTemplate = () => '<div class="films-list__container"></div>';

export default class FilmsListInnerView {
  #element = null;

  get template() {
    return createFilmsListInnerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
