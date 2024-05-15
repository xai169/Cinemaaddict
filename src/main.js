import MenuView from "./view/menu.js";
import UserRankView from "./view/user-rank.js";
import FilmsCountView from "./view/films-count.js";
import { generateFilmCard } from './mock/mock-film-card.js';
import { setFiltersCount } from './mock/mock-filters.js';
import { render, RenderPosition } from './utils/render.js';
import MovieListPresenter from './presenter/MovieList.js';
import MoviesModel from './model/movies.js';

const FILM_CARDS_COUNT = 20;

//Генерация данных
const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilmCard);
const filters = setFiltersCount(filmCards);

const moviesModel = new MoviesModel();
moviesModel.setMovies(filmCards);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmFooterStatistic = document.querySelector('.footer__statistics');

const movieListPresenter = new MovieListPresenter(siteMainElement, moviesModel);

render(siteHeaderElement, new UserRankView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuView(filters), RenderPosition.AFTERBEGIN);
render(filmFooterStatistic, new FilmsCountView(filmCards), RenderPosition.BEFOREEND);


movieListPresenter.init();