import StatsView from "./view/stats.js";
import FilmsCountView from "./view/films-count.js";
import { generateFilmCard } from './mock/mock-film-card.js';
import { render, RenderPosition } from './utils/render.js';
import MovieListPresenter from './presenter/MovieList.js';
import FilterPresenter from './presenter/Filter.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import { MenuItem } from './const.js'

const FILM_CARDS_COUNT = 20;

//Генерация данных
const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilmCard);

const moviesModel = new MoviesModel();
moviesModel.setMovies(filmCards);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector('.main');
const filmFooterStatistic = document.querySelector('.footer__statistics');
const stats = new StatsView();

render(filmFooterStatistic, new FilmsCountView(filmCards), RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, moviesModel, filterModel);

// const siteMenuClickHandler = (menuItem) => {
//   switch (menuItem) {
//     case MenuItem.MOVIE_LIST:
//       movieListPresenter.init();
//       stats.hideElement();
//       break;
//     case MenuItem.STATS:
//       movieListPresenter.destroy();
//       stats.showElement();
//       break;
//   }
// }

filterPresenter.init();
movieListPresenter.init();
