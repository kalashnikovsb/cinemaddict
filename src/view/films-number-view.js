import AbstractView from '../framework/view/abstract-view.js';

const createFilmsNumberTemplate = () => '<p>130 291 movies inside</p>';

export default class FilmsNumberView extends AbstractView {
  get template() {
    return createFilmsNumberTemplate();
  }
}
