import SmartView from './smart.js';
import { setFilmCardControl } from '../mock/mock-film-card.js';
import { compareCommentDate, getRunTime } from '../utils/film-cards.js';
import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import { nanoid } from 'nanoid';
import he from 'he';
import Api from "../api.js";

const CreateEmojiChanger = (emojiIcon, hasEmoji) => {
  return `${hasEmoji ? `<img src="./images/emoji/${emojiIcon}.png" width="55" height="55" alt="emoji-${emojiIcon}">` : ``}`;
}

const createCommentTemplate = (message) => {
  const { id, emotion, comment, author, date } = message;
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${date}</span>
      <button class="film-details__comment-delete" data-id="${id}">Delete</button>
    </p>
  </div>
</li>`;
}

const createCommentsTemplate = (comments) => {
  if (comments.length !== 0) {
    const commentsList = comments
      .sort(compareCommentDate)
      .map((comment) => createCommentTemplate(comment))
      .join(``);
    return `${commentsList}`;
  }
  return ``;
}

const createGenreTemplate = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`
}

const createGenresTeamplate = (genres) => genres.map((genre) => createGenreTemplate(genre)).join(``);

const createPopupTemplate = (filmCard, comments) => {

  const changeEmojis = CreateEmojiChanger(filmCard.emojiIcon, filmCard.hasEmoji);

  const renderComments = createCommentsTemplate(comments);

  const runTime = getRunTime(filmCard.duration);

  const genres = createGenresTeamplate(filmCard.genre);

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${filmCard.poster}" alt="">

          <p class="film-details__age">${filmCard.ageRaiting}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmCard.title}</h3>
              <p class="film-details__title-original">Original: ${filmCard.alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmCard.raiting}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmCard.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmCard.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmCard.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${filmCard.releaseDate.format('DD MMMM YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runTime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmCard.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${genres}
            </tr>
          </table>

          <p class="film-details__film-description">${filmCard.description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button ${setFilmCardControl.popup(filmCard.filter.isWatchList)} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${setFilmCardControl.popup(filmCard.filter.isWatched)} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${setFilmCardControl.popup(filmCard.filter.isFavorite)} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">${renderComments}</ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${changeEmojis}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${filmCard.newCommentText}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
}

export default class Popup extends SmartView {
  constructor(filmCard, comments) {
    super();
    this._filmCard = filmCard;
    this._data = this._parseFilmToState(this._filmCard);
    this._comments = comments;

    this._popupCloseClickHandler = this._popupCloseClickHandler.bind(this);
    this._watchListPopupClickHandler = this._watchListPopupClickHandler.bind(this);
    this._favoritePopupClickHandler = this._favoritePopupClickHandler.bind(this);
    this._watchedPopupClickHandler = this._watchedPopupClickHandler.bind(this);
    this._commentEmojiChangeHandler = this._commentEmojiChangeHandler.bind(this);
    this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._commentTextAreaHandler = this._commentTextAreaHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._data, this._comments);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  reset(filmCard) {
    this.updateData(
      this._parseFilmToState(filmCard),
    );
  }

  _popupCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupCloseClick();
  }

  setPopupCloseClickHandler(callback) {
    this._callback.popupCloseClick = callback;
    this.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this._popupCloseClickHandler);
  };

  _watchListPopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListPopupClick();
  };

  _favoritePopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoritePopupClick();
  };

  _watchedPopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedPopupClick();
  };

  _deleteCommentClickHandler(evt) {
    evt.preventDefault();
    const commentId = evt.target.dataset.id;
    this._callback.deleteComment(commentId);
  };

  _formSubmitHandler(evt) {
    if (evt.ctrlKey && evt.key === `Enter`) {
      if (this._data.newCommentText === `` || this._data.emojiIcon === ``) {
        return;
      }
      const newComment = {
        emotion: this._data.emojiIcon,
        comment: this._data.newCommentText,
      }
      this._parseStateToFilm(this._data);
      this._callback.formSubmit(newComment);
    }
  }

  setWatchListPopupClickHandler(callback) {
    this._callback.watchListPopupClick = callback;
    this.getElement()
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this._watchListPopupClickHandler);
  };

  setFavoritePopupClickHandler(callback) {
    this._callback.favoritePopupClick = callback;
    this.getElement()
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this._favoritePopupClickHandler);
  };

  setWatchedPopupClickHandler(callback) {
    this._callback.watchedPopupClick = callback;
    this.getElement()
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this._watchedPopupClickHandler);
  };

  setDeleteCommentClickHandler(callback) {
    this._callback.deleteComment = callback;
    this.getElement()
      .querySelectorAll('.film-details__comment-delete')
      .forEach((item) => item.addEventListener('click', this._deleteCommentClickHandler))
  };

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement()
      .querySelector('form')
      .addEventListener('submit', this._formSubmitHandler);
  }

  _commentEmojiChangeHandler(evt) {
    const scrollTop = this.getElement().scrollTop;
    evt.preventDefault();
    this.updateData({
      emojiIcon: evt.target.value,
      hasEmoji: true,
    });

    this.getElement().scrollTop = scrollTop;
  }

  _commentTextAreaHandler(evt) {
    this.updateData({
      newCommentText: he.encode(evt.target.value)
    }, true);
  }

  _parseFilmToState(filmCard) {
    return Object.assign(
      {},
      filmCard,
      {
        hasEmoji: false,
        emojiIcon: ``,
        newCommentText: ``,
      },
    );
  }

  _parseStateToFilm(data) {
    data = Object.assign({}, data);

    if (!data.hasEmoji) {
      data.hasEmoji = false;
    }

    if (!data.emojiIcon) {
      data.emojiIcon = ``;
    }

    if (!data.newCommentText) {
      data.newCommentText = ``;
    }

    data.filter = {
      isFavorite: this._data.filter.isFavorite,
      isWatched: this._data.filter.isWatched,
      isWatchList: this._data.filter.isWatchList,
    }

    delete data.emojiIcon;
    delete data.hasEmoji;

    return data;
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentTextAreaHandler);

    this.getElement().
      querySelector('.film-details__emoji-list')
      .addEventListener('change', this._commentEmojiChangeHandler);

    this.getElement()
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this._watchListPopupClickHandler);

    this.getElement()
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this._favoritePopupClickHandler);

    this.getElement()
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this._watchedPopupClickHandler);

    this.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this._popupCloseClickHandler);

    this.getElement()
      .querySelectorAll('.film-details__comment-delete')
      .forEach((item) => item.addEventListener('click', this._deleteCommentClickHandler));

    this.getElement()
      .querySelector('form')
      .addEventListener('keydown', this._formSubmitHandler);
  };
}