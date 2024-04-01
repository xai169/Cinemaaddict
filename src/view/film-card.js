import AbstractView from './abstract.js';
import { getShortDescription, setFilmCardControl } from '../mock/mock-film-card.js';

const createFilmCardTemplate = (filmCard) => {
  return `<article class="film-card">
          <h3 class="film-card__title">${filmCard.title}</h3>
          <p class="film-card__rating">${filmCard.raiting}</p>
          <p class="film-card__info">
            <span class="film-card__year">${filmCard.releaseDate.format('YYYY')}</span>
            <span class="film-card__duration">${filmCard.duration}</span>
            <span class="film-card__genre">${filmCard.genre[0]}</span>
          </p>
          <img src="./images/posters/${filmCard.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${getShortDescription(filmCard.description)}</p>
          <a class="film-card__comments">${filmCard.comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${setFilmCardControl.basic(filmCard.filter.isWatchList)}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${setFilmCardControl.basic(filmCard.filter.isWatched)}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${setFilmCardControl.basic(filmCard.filter.isFavorite)}" type="button">Mark as favorite</button>
          </div>
        </article>`;
}

export default class FilmCard extends AbstractView {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._popupShowClickHandler = this._popupShowClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCard);
  }

  _popupShowClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupShowClick();
  }

  setPopupShowClickHandler(callback) {
    this._callback.popupShowClick = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._popupShowClickHandler);
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._popupShowClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._popupShowClickHandler);
  };
}