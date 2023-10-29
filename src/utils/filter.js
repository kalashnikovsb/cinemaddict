import {FilterType} from '../const.js';

const filter = {
  [FilterType.ALL]: (films) => [...films],
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.filmInfo.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.filmInfo.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.filmInfo.userDetails.favorite),
};

export {filter};
