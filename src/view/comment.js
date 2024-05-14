import AbstractView from './abstract.js';

const createCommentsTemplate = (comment) => {
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${comment.emoji}" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${comment.text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.author}</span>
      <span class="film-details__comment-day">${comment.date.format('YYYY')}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
}

export default class Comments extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentsTemplate(this._comment);
  }
}