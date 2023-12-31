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


  addComment = (updateType, update) => {
    this.#allComments.push(update);
    this._notify(updateType, update);
  };


  deleteComment = (updateType, update) => {
    const index = this.#allComments.findIndex((film) => film.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }
    this.#allComments = [
      ...this.#allComments.slice(0, index),
      ...this.#allComments.slice(index + 1)
    ];
    this._notify(updateType);
  };
}
