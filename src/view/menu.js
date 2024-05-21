import SmartView from './smart.js';
import { FilterType } from "../const.js";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, count } = filter;
  if (type === FilterType.ALL) {
    return `<a id="${type}" href="#${FilterType.ALL.toLowerCase()}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">${name}</a>`
  }

  return `<a id="${type}" href="#${name.toLowerCase()}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">${name}<span class="main-navigation__item-count">${count}</span></a>`
}

const createMenuTemplate = (filterItems, currentFilterType) => {
  const FilterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${FilterItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional ${currentFilterType === FilterType.STATS ? 'main-navigation__additional--active' : ''}">Stats</a>
</nav>`
}

export default class Menu extends SmartView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statsClickHandler = this._statsClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.id);
  }

  _statsClickHandler(evt) {
    evt.preventDefault();
    this._callback.statsClick();
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll('.main-navigation__item')
      .forEach((item) => {
        item.addEventListener('click', this._filterTypeChangeHandler);
      })
  }

  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;
    this.getElement()
      .querySelector('.main-navigation__additional')
      .addEventListener('click', this._statsClickHandler);
  }
};
