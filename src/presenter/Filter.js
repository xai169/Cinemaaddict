import FilterView from "../view/menu.js";
import UserRankView from "../view/user-rank.js";
import { filter, userRank } from "../utils/filter.js";
import { FilterType, UserRanks, UserAction, UpdateType } from "../const";
import { render, RenderPosition, append, removeChild, replace, remove } from '../utils/render.js';

export default class Filter {
  constructor(filterContainer, moviesModel, filterModel) {
    this._siteHeaderElement = document.querySelector('.header');

    this._filterContainer = filterContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

    this._filterComponent = null;
    this._userRankComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    const userRank = this._getUserRank();
    this._userRankComponent = new UserRankView(userRank);
    render(this._siteHeaderElement, this._userRankComponent, RenderPosition.BEFOREEND);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
    console.log(filterType);
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

