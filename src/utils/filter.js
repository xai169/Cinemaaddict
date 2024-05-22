import { FilterType, UserRanks, GenreType } from "../const.js";

export const filter = {
  [FilterType.ALL]: (films) => films.filter((film) => film),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.filter.isWatchList),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.filter.isWatched),
  [FilterType.FAVORITE]: (films) => films.filter((film) => film.filter.isFavorite),
}

export const genreFilter = {
  [GenreType.SCI_FI]: (genres) => genres.filter((genre) => genre === 'Sci-Fi'),
  [GenreType.ANIMATION]: (genres) => genres.filter((genre) => genre === 'Animation'),
  [GenreType.FANTASY]: (genres) => genres.filter((genre) => genre === 'Fantasy'),
  [GenreType.COMEDY]: (genres) => genres.filter((genre) => genre === 'Comedy'),
  [GenreType.TV_SERIES]: (genres) => genres.filter((genre) => genre === 'TV Series'),
}