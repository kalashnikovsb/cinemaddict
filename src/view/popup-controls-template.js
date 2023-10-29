export const getPopupControlsTemplate = (userDetails) => {
  const {watchlist, alreadyWatched, favorite} = userDetails;
  const activeClassName = 'film-details__control-button--active';
  return `
  <section class="film-details__controls">
    <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlist ? activeClassName : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatched ? activeClassName : ''}" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button film-details__control-button--favorite ${favorite ? activeClassName : ''}" id="favorite" name="favorite">Add to favorites</button>
  </section>`;
};
