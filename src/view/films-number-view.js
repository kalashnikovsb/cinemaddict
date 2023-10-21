import {createElement} from '../render.js';

const createFilmsNumberTemplate = () => '<p>130 291 movies inside</p>';

export default class FilmsNumberView {
  #element = null;

  get template() {
    return createFilmsNumberTemplate();
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
