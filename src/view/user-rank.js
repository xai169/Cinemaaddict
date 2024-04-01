import AbstractView from './abstract.js';

const createUserRankTemplate = (filters) => {
  if (filters.rank !== '') {
    return `<section class="header__profile profile">
  <p class="profile__rating">${filters.rank}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`
  }
};

export default class UserRank extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createUserRankTemplate(this._filters);
  }
}