import Observable from '../framework/observable.js';
import {generateFilms} from '../mock/film.js';


export default class FilmsModel extends Observable {
  #films = generateFilms();


  get films() {
    return this.#films;
  }
}
