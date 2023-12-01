import UserBlockView from '../view/user-block-view';
import {getUserStatus} from '../utils/film.js';
import {remove, render, replace} from '../framework/render.js';

export default class UserBlockPresenter {
  #container = null;
  #userBlockComponent = null;
  #filmsModel = null;
  #userStatus = null;

  constructor(container, filmModel) {
    this.#container = container;
    this.#filmsModel = filmModel;

    this.#filmsModel.addObserver(this.#modelEventHandler);
  }

  init() {
    this.#userStatus = getUserStatus(this.#filmsModel.get());
    const prevUserBlockComponent = this.#userBlockComponent;
    this.#userBlockComponent = new UserBlockView(this.#userStatus);

    if (prevUserBlockComponent === null) {
      render(this.#userBlockComponent, this.#container);
      return;
    }

    replace(this.#userBlockComponent, prevUserBlockComponent);
    remove(prevUserBlockComponent);
  }

  #modelEventHandler = () => {
    this.init();
  };
}
