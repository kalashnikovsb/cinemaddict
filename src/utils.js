import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloatingPoint = (min, max) => (Math.random() * (max - min) + min).toFixed(1);

const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

const getRandomSubArray = (arr) => {
  const minLength = 1;
  const maxLength = arr.length;
  const randomLength = getRandomInteger(minLength, maxLength);
  const result = new Set();
  for (let i = 0; i < randomLength; i++) {
    result.add(getRandomArrayElement(arr));
  }
  return Array.from(result);
};

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

const getCorrectYear = (date) => dayjs(date).format('YYYY');

const getCorrectReleaseDate = (date) => dayjs(date).format('D MMMM YYYY');

const getCorrectCommentDate = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');

export {getRandomInteger, getRandomFloatingPoint, getRandomArrayElement, getRandomSubArray, getRandomIdentifiers, getCorrectRuntime, getCorrectYear, getCorrectReleaseDate, getCorrectCommentDate};
