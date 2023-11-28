import he from 'he';
import {getCorrectCommentDate} from '../utils/film.js';

export const getFilmPopupCommentsTemplate = (comments) => comments.map(({emotion, comment, author, date, id}) => `
<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${he.encode(comment)}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${getCorrectCommentDate(date)}</span>
      <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
    </p>
  </div>
</li>`).join('');
