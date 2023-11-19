const FILMS_COUNT = 30;
const COMMENTS_COUNT = 50;
const COMMENTS_LIMIT = 10;
const FILMS_COUNT_PER_STEP = 5;
const MAIN_NAVIGATION_ACTIVE_CLASS_NAME = 'main-navigation__item--active';
const ALL_MOVIES_FILTER_NAME = 'All movies';

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const UserStatusValue = {
  NOVICE: 0,
  FAN: 10,
  MOVIE_BUFF: 20,
};

const UserStatusTitle = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

const SortType = {
  DEFAULT: 'DEFAULT',
  DATE: 'DATE',
  RATING: 'RATING',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const TITLES = [
  'The Shawshank Redemption',
  'Spider-Man: Across the Spider-Verse',
  'Killers of the Flower Moon',
  'Oppenheimer',
  'Poor Things',
  'The Shining',
  'Dune: Part One',
  'Past Lives',
  'Sound of Freedom',
  'John Wick: Chapter 4',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet. Ut enim ad minima veniam, quis nostrum exercitationem.',
  'Consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Nam libero tempore, cum soluta nobis est eligendi optio.',
  'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. At vero eos et accusamus et iusto odio.',
  'At vero eos et accusamus et iusto odio. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Nam libero tempore, cum soluta nobis est eligendi optio. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Excepteur sint occaecat cupidatat non proident. Consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.',
  'Ut enim ad minima veniam, quis nostrum exercitationem. Lorem ipsum dolor sit amet.',
];

const GENRES = [
  'Action',
  'Romance',
  'Thriller',
  'Fantasy',
  'Drama',
  'Historical',
  'Satire',
  'Other',
];

const NAMES = [
  'Robert De Niro',
  'Jack Nicholson',
  'Katharine Hepburn',
  'Julia Roberts',
  'Morgan Freeman',
  'Takeshi Kitano',
  'Sophia Loren',
  'Laurence Olivier',
  'Vivien Leigh',
  'Steve McQueen',
];

const COUNTRIES = [
  'Russia',
  'USA',
  'Ukraine',
  'China',
  'France',
  'Germany',
  'Japan',
  'Italy',
  'Kazakhstan',
  'Kenia',
];

const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

export {
  FILMS_COUNT,
  COMMENTS_COUNT,
  COMMENTS_LIMIT,
  FILMS_COUNT_PER_STEP,
  MAIN_NAVIGATION_ACTIVE_CLASS_NAME,
  ALL_MOVIES_FILTER_NAME,
  FilterType,
  UserStatusValue,
  UserStatusTitle,
  SortType,
  UserAction,
  UpdateType,
  TITLES,
  DESCRIPTIONS,
  GENRES,
  NAMES,
  COUNTRIES,
  EMOTIONS,
  POSTERS
};
