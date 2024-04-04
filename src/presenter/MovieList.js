import FilmSectionView from "../view/film-section.js";
import FilmListView from "../view/film-list.js";
import SortView from "../view/sort.js";
import ShowMoreButtonView from "../view/showmore-button.js";
import TopRatedFilmsView from "../view/toprated-films.js";
import MostCommentedFilmsView from "../view/mostcommented-films.js";
import EmptyFilmListView from "../view/empty-film-list.js";
import { updateItem } from '../utils/common.js';
import { compareCommentsNumber, compareFilmRaiting } from '../utils/film-cards.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import MoviePresenter from './Movie.js';

const EXTRA_FILMS_COUNT = 2;
const FILMS_START_COUNT = 5;
const FILM_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._moviePresenter = {};

    this._renderedFilmsCount = FILMS_START_COUNT;
    this._emptyListComponent = new EmptyFilmListView();
    this._sortComponent = new SortView();
    this._filmSectionComponent = new FilmSectionView();
    this._filmListComponent = new FilmListView();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsView();
    this._topRatedFilmsComponent = new TopRatedFilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._showMoreButtonHandler = this._showMoreButtonHandler.bind(this);
    this._handleMovieCardChange = this._handleMovieCardChange.bind(this);
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();

    if (filmCards.length === 0) {
      this._renderEmptyList();
      return;
    }
    this._renderMovieList();
  }

  _handleMovieCardChange(updatedMovieCard) {
    this._filmCards = updateItem(this._filmCards, updatedMovieCard);
    this._moviePresenter[updatedMovieCard.id].init(updatedMovieCard);
  };

  _renderMovieCard(movieCardListElement, movieCard) {
    const moviePresenter = new MoviePresenter(this._handleMovieCardChange);
    moviePresenter.init(movieCardListElement, movieCard);
    this._moviePresenter[movieCard.id] = moviePresenter;
  };

  _renderEmptyList() {
    render(this._movieListContainer, this._emptyListComponent, RenderPosition.BEFOREEND);
  };

  _renderSort() {
    render(this._movieListContainer, this._sortComponent, RenderPosition.BEFOREEND);
  };

  _showMoreButtonHandler() {
    this._renderMovieCards(this._renderedFilmsCount, this._renderedFilmsCount + FILM_COUNT_PER_STEP);
    this._renderedFilmsCount += FILM_COUNT_PER_STEP;
    console.log(this._renderedFilmsCount);
    if (this._renderedFilmsCount >= this._filmCards.length) {
      remove(this._showMoreButtonComponent);
    }
  };

  _renderShowMoreButton() {

    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._showMoreButtonHandler);
  };

  _renderMostCommentedFilms() {
    render(this._filmSectionComponent, this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);
    const mostCommentedList = this._mostCommentedFilmsComponent.getElement().querySelector('.films-list__container');
    const mostCommentedFilms = this._filmCards.slice().sort(compareCommentsNumber);
    mostCommentedFilms
      .slice(0, EXTRA_FILMS_COUNT)
      .forEach((filmCard) => {
        this._renderMovieCard(mostCommentedList, filmCard);
      })
  };

  _renderTopRatedFilms() {
    render(this._filmSectionComponent, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
    const topRatedList = this._topRatedFilmsComponent.getElement().querySelector('.films-list__container');
    const topRatedFilms = this._filmCards.slice().sort(compareFilmRaiting);
    topRatedFilms
      .slice(0, EXTRA_FILMS_COUNT)
      .forEach((filmCard) => {
        this._renderMovieCard(topRatedList, filmCard);
      })
  };

  _renderMovieCards(from, to) {
    const filmContainer = this._filmListComponent.getElement().querySelector('.films-list__container');
    this._filmCards
      .slice(from, to)
      .forEach((filmCard) => {
        this._renderMovieCard(filmContainer, filmCard);
      });
  };

  _renderMovieList() {

    this._renderSort();

    render(this._movieListContainer, this._filmSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmSectionComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderMovieCards(0, FILMS_START_COUNT);

    if (this._filmCards.length > FILMS_START_COUNT) {
      this._renderShowMoreButton();
    }

    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  };
};