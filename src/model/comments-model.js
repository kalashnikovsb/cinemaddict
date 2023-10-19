import {generateComments} from '../mock/comment.js';

export default class CommentsModel {
  comments = generateComments();

  get = ({comments: arr}) => {
    const result = [];
    arr.forEach((arrItem) => {
      const item = this.comments.find((comment) => comment.id === arrItem);
      if (item) {
        result.push(item);
      }
    });
    return result;
  };
}
