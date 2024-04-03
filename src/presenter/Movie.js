import FilmCardView from "../view/film-card.js";
import PopupView from "../view/popup.js";
import CommentsView from "../view/comment.js";
import { checkEsc } from '../utils/common.js';
import { render, RenderPosition, append, remove } from '../utils/render.js';

export default class Movie {
  constructor() {
    this._siteBody = document.querySelector('body');

    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._showHandle = this._showHandle.bind(this);
    this._closeHandle = this._closeHandle.bind(this);
  }

  init(movieCardListElement, movieCard) {
    this._movieCard = movieCard;

    this._filmComponent = new FilmCardView(movieCard);
    this._filmPopupComponent = new PopupView(movieCard);

    this._filmComponent.setPopupShowClickHandler(() => this._showHandle(movieCard));
    this._filmPopupComponent.setPopupCloseClickHandler(() => this._closeHandle());

    render(movieCardListElement, this._filmComponent, RenderPosition.BEFOREEND)
  };

  _onEscKeyDown(evt) {
    if (checkEsc(evt)) {
      this._closePopup();
    }
  };

  _showPopup(movieCard) {
    append(this._siteBody, this._filmPopupComponent);
    const commentsList = this._filmPopupComponent.getElement().querySelector('.film-details__comments-list');
    for (let i = 0; i < movieCard.comments.length; i++) {
      render(commentsList, new CommentsView(movieCard.comments[i]), RenderPosition.BEFOREEND);
    }

    this._siteBody.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  _closePopup() {
    this._siteBody.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._onEscKeyDown);
    this._siteBody.removeChild(this._filmPopupComponent);
  }

  _showHandle(movieCard) {
    this._showPopup(movieCard);
  }

  _closeHandle() {
    this._closePopup();
  }
};