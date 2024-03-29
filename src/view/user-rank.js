import { createElement } from '../mock/util.js';

const createUserRankTemplate = (filters) => {
  if (filters.rank !== '') {
    return `<section class="header__profile profile">
  <p class="profile__rating">${filters.rank}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`
  }
};

export default class Menu {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createUserRankTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}