import { FilterType, UserRanks } from "../const.js";

export const filter = {
  [FilterType.ALL]: (films) => films.filter((film) => film),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.filter.isWatchList),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.filter.isWatched),
  [FilterType.FAVORITE]: (films) => films.filter((film) => film.filter.isFavorite),
}

export const userRank = {
  [UserRanks.NO_RANK]: (films) => films.filter((film) => film),
  [UserRanks.NOVICE]: (films) => films.filter((film) => film.filter.isWatchList),
  [UserRanks.FAN]: (films) => films.filter((film) => film.filter.isWatched),
  [UserRanks.MOVIE_BUFF]: (films) => films.filter((film) => film.filter.isFavorite),
  // Доделать
}