import AbstractView from "./abstract";

const createMostCommentedFilmsTemplate = () => {
  return `<section class="films-list films-list--extra" id="most_commented">
  <h2 class="films-list__title">Most commented</h2>

  <div class="films-list__container">
  </div>
    </section>`;
}

export default class MostCommentedFilms extends AbstractView {

  getTemplate() {
    return createMostCommentedFilmsTemplate();
  }
}