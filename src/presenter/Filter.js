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

    const prevUserRankComponent = this._userRankComponent;
    const userRank = this._getUserRank();
    this._userRankComponent = new UserRankView(userRank);

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

    this._prevStatsComponent = this._statsComponent;
    this._statsComponent = new StatsView();

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

    return filter[FilterType.HISTORY](movies).length;
  }
}

