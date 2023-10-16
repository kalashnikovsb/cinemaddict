import {createElement} from '../render.js';

const createFilmsNumberTemplate = () => '<p>130 291 movies inside</p>';

export default class FilmsNumberView {
  getTemplate() {
    return createFilmsNumberTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
