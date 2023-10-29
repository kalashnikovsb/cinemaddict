import {getRandomInteger} from './common.js';
import {UserStatusTitle, UserStatusValue} from '../const.js';
import dayjs from 'dayjs';

const getRandomIdentifiers = (count, limit) => {
  const result = [];
  const quantity = getRandomInteger(0, limit);
  for (let i = 0; i < quantity; i++) {
    result.push(String(getRandomInteger(0, count)));
  }
  return result;
};

const getCorrectRuntime = (durationOnMinutes) => {
  const hours = Math.floor(durationOnMinutes / 60);
  const minutes = durationOnMinutes % 60;
  return `${hours}h ${minutes}m`;
};

const getUserStatus = (films) => {
  const watchedFilmCount = films.filter((film) => film.filmInfo.userDetails.alreadyWatched).length;
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

const getCorrectYear = (date) => dayjs(date).format('YYYY');

const getCorrectReleaseDate = (date) => dayjs(date).format('D MMMM YYYY');

const getCorrectCommentDate = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');

export {getRandomIdentifiers, getCorrectRuntime, getCorrectYear, getCorrectReleaseDate, getCorrectCommentDate, getUserStatus};
