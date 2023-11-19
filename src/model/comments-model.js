import Observable from '../framework/observable.js';
import {generateComments} from '../mock/comment.js';


export default class CommentsModel extends Observable {
  #filmsModel = null;
  #allComments = [];
  #comments = [];


  constructor(filmsModel) {
    super();
    this.#filmsModel = filmsModel;
    this.#allComments = generateComments();
  }


  get(film) {
    this.#comments = this.#allComments.filter((comment) =>
      film.comments.includes(comment.id));
    return this.#comments;
  }
}
