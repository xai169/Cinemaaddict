const setFiltersCount = (filmCards) => {
  let filters = {
    watchList: 0,
    history: 0,
    favorite: 0,
    rank: 0,
  };

  filmCards.forEach((filmCard) => {
    if (filmCard.filter.isFavorite) {
      filters.favorite += 1;
    }
    if (filmCard.filter.isWatched) {
      filters.history += 1;
    }
    if (filmCard.filter.isWatchList) {
      filters.watchList += 1;
    }
  })

  if (filters.history === 0) {
    filters.rank = '';
  }
  if (filters.history > 1) {
    filters.rank = 'novice';
  }
  if (filters.history > 10) {
    filters.rank = 'fan';
  }
  if (filters.history > 21) {
    filters.rank = 'movie buff';
  };

  return filters;
};

export { setFiltersCount };