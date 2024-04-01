import AbstractView from './abstract.js';

const createFilmsCountTemplate = (filmCards) => {
  return `<p>${filmCards.length} movies inside</p>`;
};

export default class FilmsCount extends AbstractView {
  constructor(filmCards) {
    super();
    this._filmCards = filmCards;
  }

  getTemplate() {
    return createFilmsCountTemplate(this._filmCards);
  }
}