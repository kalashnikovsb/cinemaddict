import {createElement} from '../render.js';

const createFilmsListInnerTemplate = () => '<div class="films-list__container"></div>';

export default class FilmsListInnerView {
  getTemplate() {
    return createFilmsListInnerTemplate();
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
