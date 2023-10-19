import {COMMENTS_COUNT, NAMES, EMOTIONS, DESCRIPTIONS} from '../const.js';
import {getRandomInteger, getRandomArrayElement} from '../utils.js';

export const generateComment = () => ({
  id: String(getRandomInteger(0, 30)),
  author: getRandomArrayElement(NAMES),
  comment: getRandomArrayElement(DESCRIPTIONS),
  date: '2019-05-11T16:12:32.554Z',
  emotion: getRandomArrayElement(EMOTIONS),
});


export const generateComments = () => Array.from({length: COMMENTS_COUNT}, generateComment);
