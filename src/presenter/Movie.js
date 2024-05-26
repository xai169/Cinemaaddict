import FilmCardView from "../view/film-card.js";
import PopupView from "../view/popup.js";
import { checkEsc } from '../utils/common.js';
import { render, RenderPosition, append, removeChild, replace, remove } from '../utils/render.js';
import { UserAction, UpdateType, CommentState } from "../const.js";
import Api from "../api.js";

const Mode = {
  DEFAULT: `default`,
  EDITING: `editing`
};

export default class Movie {
  constructor(movieCardListElement, changeData, changeMode, api) {
    this._siteBody = document.querySelector('body');

    this._changeData = changeData;
    this._changeMode = changeMode;
    this._movieCardListElement = movieCardListElement;
    this._mode = Mode.DEFAULT;
    this._movieCard = {};
    this._api = api;

    this._filmComponent = null;
    this._filmPopupComponent = null;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._handlePopupShow = this._handlePopupShow.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWathedClick = this._handleWathedClick.bind(this);

    this._handlePopupWatchListClick = this._handlePopupWatchListClick.bind(this);
    this._handlePopupFavoriteClick = this._handlePopupFavoriteClick.bind(this);
    this._handlePopupWathedClick = this._handlePopupWathedClick.bind(this);
    this._deleteComment = this._deleteComment.bind(this);
    this._addComment = this._addComment.bind(this);
  }

  init(movieCard) {
    this._movieCard = movieCard;

    const oldFilmCard = this._filmComponent;
    const oldFilmPopupCard = this._filmPopupComponent;

    this._filmComponent = new FilmCardView(this._movieCard);

    this._filmComponent.setPopupShowClickHandler(this._handlePopupShow);

    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchedClickHandler(this._handleWathedClick);

    if (oldFilmCard === null) {
      render(this._movieCardListElement, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filmComponent, oldFilmCard);

    remove(oldFilmCard);
    remove(oldFilmPopupCard);
  };

  _onEscKeyDown(evt) {
    if (checkEsc(evt)) {
      this._closePopup();
    }
  };

  _renderFilmDetails(film, comments) {

    this._filmPopupComponent = new PopupView(film, comments);

    this._siteBody.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscKeyDown);

    this._filmPopupComponent.setPopupCloseClickHandler(this._closePopup);
    this._filmPopupComponent.setWatchListPopupClickHandler(this._handlePopupWatchListClick);
    this._filmPopupComponent.setFavoritePopupClickHandler(this._handlePopupFavoriteClick);
    this._filmPopupComponent.setWatchedPopupClickHandler(this._handlePopupWathedClick);
    this._filmPopupComponent.setDeleteCommentClickHandler(this._deleteComment);
    this._filmPopupComponent.setFormSubmitHandler(this._addComment);

    render(this._siteBody, this._filmPopupComponent, RenderPosition.BEFOREEND);

    if (document.querySelectorAll('.film-details').length > 1) {
      document.querySelectorAll('.film-details')[0].remove();
    }
  }

  _handlePopupShow() {
    this._api.getComments(this._movieCard)
      .then((comments) => {
        this._renderFilmDetails(this._movieCard, comments);
      })
      .catch(() => {
        this._renderFilmDetails(this._movieCard, []);
      });
  }

  _closePopup() {
    this._siteBody.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._onEscKeyDown);
    remove(this._filmPopupComponent);
    this._mode = Mode.DEFAULT;
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._movieCard,
      ),
    );
  };

  _handleWatchListClick() {
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._movieCard,
        {
          filter: {
            isFavorite: this._movieCard.filter.isFavorite,
            isWatched: this._movieCard.filter.isWatched,
            isWatchList: !this._movieCard.filter.isWatchList,
            watchingDate: this._movieCard.filter.watchingDate,
          }
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._movieCard,
        {
          filter: {
            isFavorite: !this._movieCard.filter.isFavorite,
            isWatched: this._movieCard.filter.isWatched,
            isWatchList: this._movieCard.filter.isWatchList,
            watchingDate: this._movieCard.filter.watchingDate,
          }
        },
      ),
    );
  }

  _handleWathedClick() {
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._movieCard,
        {
          filter: {
            isFavorite: this._movieCard.filter.isFavorite,
            isWatched: !this._movieCard.filter.isWatched,
            isWatchList: this._movieCard.filter.isWatchList,
            watchingDate: this._movieCard.filter.watchingDate,
          }
        },
      ),
    );
  };

  _handlePopupWatchListClick() {
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
            watchingDate: this._movieCard.filter.watchingDate,
          }
        },
      ),
    );
  }

  _handlePopupFavoriteClick() {
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
            watchingDate: this._movieCard.filter.watchingDate,
          }
        },
      ),
    );
  }

  _handlePopupWathedClick() {
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
            watchingDate: this._movieCard.filter.watchingDate,
          }
        },
      ),
    );
  };

  _deleteComment(commentId) {
    const currentComments = this._movieCard.comments.slice();
    const remainingComments = currentComments.filter((comment) => comment.id !== commentId);


    this._changeData(
      UserAction.DELETE_MOVIE_COMMENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._movieCard,
        {
          comments:
            remainingComments
        },
      ),
      commentId
    );
  }

  _addComment(newComment) {
    const currentComments = this._movieCard.comments.slice();

    this._changeData(
      UserAction.ADD_MOVIE_COMMENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._movieCard,
        {
          comments:
            [...currentComments, newComment]
        },
      ),
      newComment
    );
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  setViewState(state, commentId) {
    const resetFormState = () => {
      this._filmPopupComponent.updateData({
        isDisabled: false,
        deletingId: '',
        isDeleting: false,
      });
    };

    switch (state) {
      case CommentState.DELETING:
        const popupScrollPostition = document.querySelector('.film-details').scrollTop;
        this._filmPopupComponent.updateData({
          isDisabled: true,
          isDeleting: true,
          deletingId: commentId,
        });
        document.querySelector('.film-details').scrollTop = popupScrollPostition;
        break;
      case CommentState.ABORTING:
        this._filmPopupComponent.shake(resetFormState);
        break;
    }
  }
}