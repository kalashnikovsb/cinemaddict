import {getRandomInteger, getRandomFloatingPoint, getRandomArrayElement, getRandomSubArray, getRandomIdentifiers} from '../utils.js';
import {FILMS_COUNT, COMMENTS_COUNT, COMMENTS_LIMIT, TITLES, DESCRIPTIONS, GENRES, NAMES, COUNTRIES, POSTERS} from '../const.js';

const generateFilm = () => ({
  id: String(getRandomInteger(0, 10)),
  comments: getRandomIdentifiers(COMMENTS_COUNT, COMMENTS_LIMIT),
  filmInfo: {
    title: getRandomArrayElement(TITLES),
    alternativeTitle: getRandomArrayElement(TITLES),
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
    description: getRandomArrayElement(DESCRIPTIONS),
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: Boolean(getRandomInteger(0, 1)),
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: Boolean(getRandomInteger(0, 1)),
    },
  },
});

export const generateFilms = () => Array.from({length: FILMS_COUNT}, generateFilm);
