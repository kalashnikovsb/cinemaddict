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

export {getRandomInteger, getRandomFloatingPoint, getRandomArrayElement, getRandomSubArray};
