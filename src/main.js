import Api from "./api/api.js";
import FilmsCountView from "./view/films-count.js";
import { render, RenderPosition } from './utils/render.js';
import MovieListPresenter from './presenter/MovieList.js';
import FilterPresenter from './presenter/Filter.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import { UpdateType } from "./const.js";
import { toast } from './utils/toast.js';
import { isOnline } from './utils/common.js';
import Store from './api/store.js';
import Provider from './api/provider.js';


const AUTHORIZATION = 'Basic asdfghbhnzxhnlasd324fn';
const END_POINT = 'https://14.ecmascript.htmlacademy.pro/cinemaddict';

const STORE_PREFIX = 'cinemaddict-localstorage';
const STORE_VER = 'v24';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteMainElement = document.querySelector('.main');
const filmFooterStatistic = document.querySelector('.footer__statistics');

const api = new Api(END_POINT, AUTHORIZATION);

const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

const movieListPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel, apiWithProvider);
const filterPresenter = new FilterPresenter(siteMainElement, moviesModel, filterModel);

render(filmFooterStatistic, new FilmsCountView("123", RenderPosition.BEFOREEND));


movieListPresenter.init();

apiWithProvider.getMovies()
  .then((movies) => {
    moviesModel.setMovies(UpdateType.INIT, movies);
    filterPresenter.init();
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('./sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});