import AbstractView from "./abstract";

const createFilmListTemplate = () => {
  return `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`;
}

export default class FilmList extends AbstractView {

  getTemplate() {
    return createFilmListTemplate();
  }
}