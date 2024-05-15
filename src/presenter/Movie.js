import FilmCardView from "../view/film-card.js";
import PopupView from "../view/popup.js";
import { checkEsc } from '../utils/common.js';
import { render, RenderPosition, append, removeChild, replace, remove } from '../utils/render.js';
import { UserAction, UpdateType } from "../const.js";

const Mode = {
  DEFAULT: `default`,
  EDITING: `editing`
};

export default class Movie {
  constructor(movieCardListElement, changeData, changeMode) {
    this._siteBody = document.querySelector('body');

    this._changeData = changeData;
    this._changeMode = changeMode;
    this._movieCardListElement = movieCardListElement;
    this._mode = Mode.DEFAULT;
    this._movieCard = {};

    this._filmComponent = null;
    this._filmPopupComponent = null;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._handlePopupShow = this._handlePopupShow.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWathedClick = this._handleWathedClick.bind(this);
  }

  init(movieCard) {
    this._movieCard = movieCard;

    const oldFilmCard = this._filmComponent;
    const oldFilmPopupCard = this._filmPopupComponent;

    this._filmComponent = new FilmCardView(this._movieCard);

    this._filmPopupComponent = new PopupView(movieCard);

    this._filmComponent.setPopupShowClickHandler(this._handlePopupShow);
    this._filmPopupComponent.setPopupCloseClickHandler(this._closePopup);

    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchedClickHandler(this._handleWathedClick);

    this._filmPopupComponent.setWatchListPopupClickHandler(this._handleWatchListClick);
    this._filmPopupComponent.setFavoritePopupClickHandler(this._handleFavoriteClick);
    this._filmPopupComponent.setWatchedPopupClickHandler(this._handleWathedClick);

    if (oldFilmCard === null) {
      render(this._movieCardListElement, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filmComponent, oldFilmCard);

    if (this._mode === Mode.EDITING) {
      const popupScrollPostition = document.querySelector('.film-details').scrollTop;
      replace(this._filmPopupComponent, oldFilmPopupCard);
      document.querySelector('.film-details').scrollTop = popupScrollPostition;
    }
    remove(oldFilmCard);
    remove(oldFilmPopupCard);
  };

  _onEscKeyDown(evt) {
    if (checkEsc(evt)) {
      this._closePopup();
    }
  };

  _showPopup() {
    append(this._siteBody, this._filmPopupComponent);
    this._siteBody.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  };

  _handlePopupShow() {
    this._showPopup();
  }

  _closePopup() {
    this._siteBody.classList.remove('hide-overflow');
    this._filmPopupComponent.reset(this._movieCard);
    document.removeEventListener('keydown', this._onEscKeyDown);
    removeChild(this._siteBody, this._filmPopupComponent);
    this._mode = Mode.DEFAULT;
  };

  _handleWatchListClick() {
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._movieCard,
        {
          filter: {
            isFavorite: this._movieCard.filter.isFavorite,
            isWatched: this._movieCard.filter.isWatched,
            isWatchList: !this._movieCard.filter.isWatchList,
          }
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._movieCard,
        {
          filter: {
            isFavorite: !this._movieCard.filter.isFavorite,
            isWatched: this._movieCard.filter.isWatched,
            isWatchList: this._movieCard.filter.isWatchList,
          }
        },
      ),
    );
  }

  _handleWathedClick() {
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._movieCard,
        {
          filter: {
            isFavorite: this._movieCard.filter.isFavorite,
            isWatched: !this._movieCard.filter.isWatched,
            isWatchList: this._movieCard.filter.isWatchList,
          }
        },
      ),
    );
  };

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }
}