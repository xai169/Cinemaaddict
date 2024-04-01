import AbstractView from "./abstract";

const createFilmSectionTemplate = () => {
  return `<section class="films"></section>`;
}

export default class FilmList extends AbstractView {

  getTemplate() {
    return createFilmSectionTemplate();
  }
}