import {generateComments} from '../mock/comment.js';

export default class CommentsModel {
  comments = generateComments();

  get = ({comments: arr}) => {
    const result = [];
    arr.forEach((arrItem) => {
      const value = this.comments.find((comment) => comment.id === arrItem);
      if (value) {
        result.push(value);
      }
    });
    return result;
  };
}
