import MenuView from "./view/menu.js";
import FilmCardView from "./view/film-card.js";
import FilmSectionView from "./view/film-section.js";
import FilmListView from "./view/film-list.js";
import PopupView from "./view/popup.js";
import ShowMoreButtonView from "./view/showmore-button.js";
import TopRatedFilmsView from "./view/toprated-films.js";
import MostCommentedFilmsView from "./view/mostcommented-films.js";
import UserRankView from "./view/user-rank.js";
import FilmsCountView from "./view/films-count.js";
import { generateFilmCard } from './mock/mock-film-card.js';
import { setFiltersCount } from './mock/mock-filters.js';
import CommentsView from "./view/comment.js";
import EmptyFilmListView from "./view/empty-film-list.js";
import { checkEsc } from './utils/common.js';
import { compareCommentsNumber, compareFilmRaiting } from './utils/film-cards.js';
import { render, RenderPosition, append, remove } from './utils/render.js';

const EXTRA_FILMS_COUNT = 2;
const FILMS_START_COUNT = 5;
const FILM_CARDS_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const siteBody = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmFooterStatistic = document.querySelector('.footer__statistics');

//Генерация данных
const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilmCard);
const filters = setFiltersCount(filmCards);

//Функция отрисовки карточки и попапа
const renderFilmCard = (filmCardListElement, filmCard) => {
  const filmComponent = new FilmCardView(filmCard);
  const filmPopupComponent = new PopupView(filmCard);

  const onEscKeyDown = (evt) => {
    if (checkEsc(evt)) {
      closePopup();
    }
  };

  const showPopup = () => {
    append(siteBody, filmPopupComponent);
    const commentsList = filmPopupComponent.getElement(filmCard).querySelector('.film-details__comments-list');
    for (let i = 0; i < filmCard.comments.length; i++) {
      render(commentsList, new CommentsView(filmCard.comments[i]).getElement(), RenderPosition.BEFOREEND);
    }

    siteBody.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
  };

  const closePopup = () => {
    // siteBody.removeChild(filmPopupComponent.getElement(filmCard));
    remove(filmPopupComponent);
    siteBody.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onEscKeyDown);
  }

  filmComponent.setPopupShowClickHandler(() => showPopup());
  filmPopupComponent.setPopupCloseClickHandler(() => closePopup());

  render(filmCardListElement, filmComponent.getElement(), RenderPosition.BEFOREEND)
};

render(siteMainElement, new MenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(filmFooterStatistic, new FilmsCountView(filmCards).getElement(), RenderPosition.BEFOREEND);

//Проверка наличия фильмов
if (filmCards.length === 0) {
  render(siteMainElement, new EmptyFilmListView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(siteHeaderElement, new UserRankView(filters).getElement(), RenderPosition.BEFOREEND);
  const filmSectionComponent = new FilmSectionView();
  render(siteMainElement, filmSectionComponent.getElement(), RenderPosition.BEFOREEND);
  const filmListComponent = new FilmListView();
  render(filmSectionComponent.getElement(), filmListComponent.getElement(), RenderPosition.BEFOREEND);

  //Отрисовка карточек в списке
  const filmContainer = filmListComponent.getElement().querySelector('.films-list__container');
  for (let i = 0; i < FILMS_START_COUNT; i++) {
    renderFilmCard(filmContainer, filmCards[i]);
  };

  //Отрисовка секций Top Rated и Most Commented
  const mostCommentedFilmsComponent = new MostCommentedFilmsView();
  render(filmSectionComponent.getElement(), mostCommentedFilmsComponent.getElement(), RenderPosition.BEFOREEND);
  const mostCommentedList = mostCommentedFilmsComponent.getElement().querySelector('.films-list__container');
  const mostCommentedFilms = filmCards.slice().sort(compareCommentsNumber);
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    renderFilmCard(mostCommentedList, mostCommentedFilms[i]);
  }
  const TopRatedFilmsComponent = new TopRatedFilmsView();
  render(filmSectionComponent.getElement(), TopRatedFilmsComponent.getElement(), RenderPosition.BEFOREEND);
  const topRatedList = TopRatedFilmsComponent.getElement().querySelector('.films-list__container');
  const topRatedFilms = filmCards.slice().sort(compareFilmRaiting);
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    renderFilmCard(topRatedList, topRatedFilms[i]);
  }

  //Логика работы SHOW MORE BUTTON
  if (filmCards.length > FILM_COUNT_PER_STEP) {
    const showMoreButtonComponent = new ShowMoreButtonView();
    render(filmListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    let renderedFilmsCount = FILM_COUNT_PER_STEP;
    showMoreButtonComponent.setClickHandler(() => {

      filmCards
        .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
        .forEach((filmCard) => {
          renderFilmCard(filmContainer, filmCard);
        });

      renderedFilmsCount += FILM_COUNT_PER_STEP;

      if (renderedFilmsCount >= filmCards.length && renderedFilmsCount === filmCards.length) {
        remove(showMoreButtonComponent);
      }
    });
  };
}