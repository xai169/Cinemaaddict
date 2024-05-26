import Api from "./api.js";
import FilmsCountView from "./view/films-count.js";
import { render, RenderPosition } from './utils/render.js';
import MovieListPresenter from './presenter/MovieList.js';
import FilterPresenter from './presenter/Filter.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import { UpdateType } from "./const.js";


const AUTHORIZATION = 'Basic asdfghbhnzxhnlasd324fn';
const END_POINT = 'https://14.ecmascript.htmlacademy.pro/cinemaddict';

const siteMainElement = document.querySelector('.main');
const filmFooterStatistic = document.querySelector('.footer__statistics');

const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

const movieListPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, moviesModel, filterModel);

render(filmFooterStatistic, new FilmsCountView("123", RenderPosition.BEFOREEND));


movieListPresenter.init();

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(UpdateType.INIT, movies);
    filterPresenter.init();
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
  });
