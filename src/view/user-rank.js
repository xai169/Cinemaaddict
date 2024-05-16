import AbstractView from './abstract.js';

const getUserRank = (filmCount) => {
  let userRank = null;

  if (filmCount === 0) {
    userRank = '';
  }
  if (filmCount > 1) {
    userRank = 'novice';
  }
  if (filmCount > 10) {
    userRank = 'fan';
  }
  if (filmCount > 21) {
    userRank = 'movie buff';
  };

  return userRank;//Переделать на свичи и использовать ин константы.
}

const createUserRankTemplate = (filmCount) => {

  const userRank = getUserRank(filmCount);

  if (filmCount === 0) {
    return `<div></div>`;
  }
  return `<section class="header__profile profile">
  <p class="profile__rating">${userRank}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`
};

export default class UserRank extends AbstractView {
  constructor(filmCount) {
    super();
    this._filmCount = filmCount;
  }

  getTemplate() {
    return createUserRankTemplate(this._filmCount);
  }
}