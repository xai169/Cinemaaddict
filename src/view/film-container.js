import AbstractView from "./abstract";

const createFilmContainerTemplate = () => {
  return `<div class="films-list__container">
    </div>`;
}

export default class filmContainer extends AbstractView {

  getTemplate() {
    return createFilmContainerTemplate();
  }
}