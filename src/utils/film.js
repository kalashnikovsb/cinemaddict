import {getRandomInteger} from './common.js';
import {UserStatusTitle, UserStatusValue} from '../const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const getRandomIdentifiers = (count, limit) => {
  const result = [];
  const quantity = getRandomInteger(0, limit);
  for (let i = 0; i < quantity; i++) {
    result.push(String(getRandomInteger(0, count)));
  }
  return result;
};


const getUserStatus = (films) => {
  const watchedFilmCount = films.filter((film) => film.userDetails.alreadyWatched).length;
  if (watchedFilmCount > UserStatusValue.NOVICE && watchedFilmCount <= UserStatusValue.FAN) {
    return UserStatusTitle.NOVICE;
  }
  if (watchedFilmCount > UserStatusValue.FAN && watchedFilmCount <= UserStatusValue.MOVIE_BUFF) {
    return UserStatusTitle.FAN;
  }
  if (watchedFilmCount > UserStatusValue.MOVIE_BUFF) {
    return UserStatusTitle.MOVIE_BUFF;
  }
  return null;
};


const getCorrectCommentDate = (date) => {
  const timeDiff = dayjs(date).diff(dayjs());
  return dayjs.duration(timeDiff).humanize(true);
};


const getCorrectRuntime = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');

const sortFilmsByDate = (filmA, filmB) => dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));

const sortFilmsByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

const getCorrectYear = (date) => dayjs(date).format('YYYY');

const getCorrectReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');


export {
  getRandomIdentifiers,
  getCorrectRuntime,
  getUserStatus,
  sortFilmsByDate,
  sortFilmsByRating,
  getCorrectYear,
  getCorrectReleaseDate,
  getCorrectCommentDate,
};
