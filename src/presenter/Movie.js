import FilmCardView from "../view/film-card.js";
import FilmSectionView from "../view/film-section.js";
import FilmListView from "../view/film-list.js";
import PopupView from "../view/popup.js";
import CommentsView from "../view/comment.js";
import { checkEsc } from '../utils/common.js';
import { render, RenderPosition, append, remove } from '../utils/render.js';

export default class Movie {
  constructor() {
    this._siteBody = document.querySelector('body');
  }

  init(movieCardListElement, movieCard) {
    const filmComponent = new FilmCardView(movieCard);
    const filmPopupComponent = new PopupView(movieCard);

    const onEscKeyDown = (evt) => {
      if (checkEsc(evt)) {
        closePopup();
      }
    };

    const showPopup = () => {
      append(this._siteBody, filmPopupComponent);
      const commentsList = filmPopupComponent.getElement(movieCard).querySelector('.film-details__comments-list');
      for (let i = 0; i < movieCard.comments.length; i++) {
        render(commentsList, new CommentsView(movieCard.comments[i]), RenderPosition.BEFOREEND);
      }

      this._siteBody.classList.add('hide-overflow');
      document.addEventListener('keydown', onEscKeyDown);
    };

    const closePopup = () => {
      remove(filmPopupComponent);
      this._siteBody.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    }

    filmComponent.setPopupShowClickHandler(() => showPopup());
    filmPopupComponent.setPopupCloseClickHandler(() => closePopup());

    render(movieCardListElement, filmComponent, RenderPosition.BEFOREEND)
  };
}