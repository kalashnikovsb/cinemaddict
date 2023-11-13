import {EMOTIONS} from '../const.js';

export const getFilmPopupEmojisTemplate = (currentEmotion) => EMOTIONS.map((emotion) => `
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${currentEmotion === emotion ? 'checked' : ''}>
  <label class="film-details__emoji-label" for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
  </label>`).join('');
