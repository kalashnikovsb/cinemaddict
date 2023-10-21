import {createElement} from '../render.js';

const createFilmsListOuterTemplate = () => `
<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
</section>`;

export default class FilmsListOuterView {
  #element = null;

  get template() {
    return createFilmsListOuterTemplate();
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
