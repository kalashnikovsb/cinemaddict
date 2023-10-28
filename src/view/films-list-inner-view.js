import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListInnerTemplate = () => '<div class="films-list__container"></div>';

export default class FilmsListInnerView extends AbstractView {
  get template() {
    return createFilmsListInnerTemplate();
  }
}
