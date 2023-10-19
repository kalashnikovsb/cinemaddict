import {getRandomInteger, getRandomFloatingPoint, getRandomArrayElement, getRandomSubArray} from '../utils.js';
import {STRINGS, GENRES, NAMES, COUNTRIES, POSTERS} from '../const.js';

export const generateFilm = () => ({
  id: String(getRandomInteger(0, 100)),
  comments: [],
  filmInfo: {
    title: getRandomArrayElement(STRINGS),
    alternativeTitle: getRandomArrayElement(STRINGS),
    totalRating: getRandomFloatingPoint(0, 10),
    poster: getRandomArrayElement(POSTERS),
    ageRating: getRandomInteger(0, 21),
    director: getRandomArrayElement(NAMES),
    writers: getRandomSubArray(NAMES),
    actors: getRandomSubArray(NAMES),
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: getRandomArrayElement(COUNTRIES),
    },
    runtime: getRandomInteger(30, 240),
    genre: getRandomSubArray(GENRES),
    description: getRandomArrayElement(STRINGS),
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: Boolean(getRandomInteger(0, 1)),
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: Boolean(getRandomInteger(0, 1)),
    },
  },
});
