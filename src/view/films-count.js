import { createElement } from '../mock/util.js';

const createFilmsCountTemplate = (filmCards) => {
  return `<p>${filmCards.length} movies inside</p>`;
};

export default class FilmsCount {
  constructor(filmCards) {
    this._element = null;
    this._filmCards = filmCards;
  }

  getTemplate() {
    return createFilmsCountTemplate(this._filmCards);
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