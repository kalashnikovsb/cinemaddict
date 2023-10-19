import {STRINGS, NAMES, EMOTIONS} from '../const.js';
import {getRandomInteger, getRandomArrayElement} from '../utils.js';

export const generateComment = () => ({
  id: String(getRandomInteger(0, 1000)),
  author: getRandomArrayElement(NAMES),
  comment: getRandomArrayElement(STRINGS),
  date: '2019-05-11T16:12:32.554Z',
  emotion: getRandomArrayElement(EMOTIONS),
});
