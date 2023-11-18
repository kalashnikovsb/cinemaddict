import {generateComments} from '../mock/comment.js';

export default class CommentsModel {
  #filmsModel = null;
  #allComments = [];
  #comments = [];

  constructor(filmsModel) {
    this.#filmsModel = filmsModel;
    this.#allComments = generateComments();
  }

  get(film) {
    this.#comments = this.#allComments.filter((comment) =>
      film.comments.includes(comment.id));
    return this.#comments;
  }
}
