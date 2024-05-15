import AbstractView from "./abstract";

const createTopRatedFilmsTemplate = () => {
  return `<section class="films-list films-list--extra" id="top_rated">
  <h2 class="films-list__title">Top rated</h2>
    </section>`;
}

export default class MostCommentedFilms extends AbstractView {

  getTemplate() {
    return createTopRatedFilmsTemplate();
  }
}