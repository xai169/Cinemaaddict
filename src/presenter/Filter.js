import FilterView from "../view/menu.js";
import UserRankView from "../view/user-rank.js";
import StatsView from "../view/stats.js";
import { filter, userRank } from "../utils/filter.js";
import { FilterType, UserRanks, UserAction, UpdateType } from "../const";
import { render, RenderPosition, append, removeChild, replace, remove } from '../utils/render.js';


export default class Filter {
  constructor(filterContainer, moviesModel, filterModel) {
    this._siteHeaderElement = document.querySelector('.header');
    this._siteMainElement = document.querySelector('main');

    this._filterContainer = filterContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

    this._filterComponent = null;
    this._userRankComponent = null;
    this._statsComponent = null;
    this._prevStatsComponent = null;
    this._UserRank = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleStatsClick = this._handleStatsClick.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterComponent.setStatsClickHandler(this._handleStatsClick);
    this._getUserRank();

    const prevUserRankComponent = this._userRankComponent;
    this._userRankComponent = new UserRankView(this._UserRank);

    // this._prevStatsComponent = this._statsComponent;
    // this._statsComponent = new StatsView();

    if (prevFilterComponent === null && prevUserRankComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      render(this._siteHeaderElement, this._userRankComponent, RenderPosition.BEFOREEND);
      return;
    }

    // if (this._prevStatsComponent === null) {
    //   this._filterModel.setFilter(UpdateType.CLEAR, FilterType.STATS);
    //   render(this._siteMainElement, this._statsComponent, RenderPosition.BEFOREEND);
    //   return;
    // }

    // replace(this._statsComponent, prevStatsComponent);

    // remove(prevStatsComponent);

    replace(this._filterComponent, prevFilterComponent);
    replace(this._userRankComponent, prevUserRankComponent);
    remove(prevFilterComponent);
    remove(prevUserRankComponent);
  }

  _handleStatsClick() {
    this._filterModel.setFilter(UpdateType.CLEAR, FilterType.STATS);
    const movies = this._moviesModel.getMovies();
    const historyMovies = filter[FilterType.HISTORY](movies);
    const durationMovies = historyMovies.map((movie) => movie.duration);
    const duration = durationMovies[1] + durationMovies[2];
    console.log(durationMovies);


    this._prevStatsComponent = this._statsComponent;
    this._statsComponent = new StatsView(this._UserRank);

    if (this._prevStatsComponent === null) {
      render(this._siteMainElement, this._statsComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._statsComponent, this._prevStatsComponent);
    remove(this._prevStatsComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
    remove(this._statsComponent);
    this._statsComponent = null;
  }

  _getFilters() {
    const movies = this._moviesModel.getMovies();

    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: '',
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](movies).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](movies).length,
      },
      {
        type: FilterType.FAVORITE,
        name: 'Favorites',
        count: filter[FilterType.FAVORITE](movies).length,
      },
    ];
  }

  _getUserRank() {
    const movies = this._moviesModel.getMovies();

    const filmCount = filter[FilterType.HISTORY](movies).length;

    if (filmCount === 0) {
      this._UserRank = '';
    }
    if (filmCount > 1) {
      this._UserRank = 'novice';
    }
    if (filmCount > 10) {
      this._UserRank = 'fan';
    }
    if (filmCount > 21) {
      this._UserRank = 'movie buff';
    };

    return this._UserRank;
  }
}

