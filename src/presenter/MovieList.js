import FilmSectionView from "../view/film-section.js";
import FilmListView from "../view/film-list.js";
import FilmContainerView from "../view/film-container.js";
import SortView from "../view/sort.js";
import ShowMoreButtonView from "../view/showmore-button.js";
import TopRatedFilmsView from "../view/toprated-films.js";
import MostCommentedFilmsView from "../view/mostcommented-films.js";
import EmptyFilmListView from "../view/empty-film-list.js";
import { updateItem } from '../utils/common.js';
import { compareCommentsNumber, compareFilmRaiting, compareFilmDate } from '../utils/film-cards.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import MoviePresenter from './Movie.js';
import { SortType } from "../const.js";

const EXTRA_FILMS_COUNT = 2;
const FILMS_START_COUNT = 5;
const FILM_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._moviePresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._renderedFilmsCount = FILMS_START_COUNT;
    this._emptyListComponent = new EmptyFilmListView();
    this._filmSectionComponent = new FilmSectionView();
    this._filmListComponent = new FilmListView();
    this._filmContainerComponent = new FilmContainerView();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsView();
    this._topRatedFilmsComponent = new TopRatedFilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._sortComponent = null;

    this._showMoreButtonHandler = this._showMoreButtonHandler.bind(this);
    this._handleMovieCardChange = this._handleMovieCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();
    this._defaultSortFilms = filmCards.slice();

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

  _renderMovieCard(movieCard, container) {
    const moviePresenter = new MoviePresenter(container, this._handleMovieCardChange, this._handleModeChange);
    moviePresenter.init(movieCard);
    this._moviePresenter[movieCard.id] = moviePresenter;
  };

  _handleModeChange() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _clearFilmsList() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());

    this._moviePresenter = {};

    this._renderedFilmsCount = FILM_COUNT_PER_STEP;

    remove(this._showMoreButtonComponent);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._filmCards.sort(compareFilmDate);
        break;
      case SortType.RAITING:
        this._filmCards.sort(compareFilmRaiting);
        break;
      default:
        this._filmCards = this._defaultSortFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmsList();
    this._renderMovieList();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      remove(this._sortComponent);
    }

    this._sortComponent = new SortView(this._currentSortType);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._movieListContainer, this._sortComponent, RenderPosition.BEFOREEND);
  };

  _renderEmptyList() {
    render(this._movieListContainer, this._emptyListComponent, RenderPosition.BEFOREEND);
  };

  _showMoreButtonHandler() {
    this._renderMovieCards(this._renderedFilmsCount, this._renderedFilmsCount + FILM_COUNT_PER_STEP);
    this._renderedFilmsCount += FILM_COUNT_PER_STEP;
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
        this._renderMovieCard(filmCard, mostCommentedList);
      })
  };

  _renderTopRatedFilms() {
    render(this._filmSectionComponent, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
    const topRatedList = this._topRatedFilmsComponent.getElement().querySelector('.films-list__container');
    const topRatedFilms = this._filmCards.slice().sort(compareFilmRaiting);
    topRatedFilms
      .slice(0, EXTRA_FILMS_COUNT)
      .forEach((filmCard) => {
        this._renderMovieCard(filmCard, topRatedList);
      })
  };

  _renderMovieCards(from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((filmCard) => {
        this._renderMovieCard(filmCard, this._filmContainerComponent);
      });
  };

  _renderMovieCardsRoater() {
    this._renderMovieCards(0, FILMS_START_COUNT);
    if (this._filmCards.length > FILMS_START_COUNT) {
      this._renderShowMoreButton();
    }
  }

  _renderMovieList() {

    this._renderSort();

    render(this._movieListContainer, this._filmSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmSectionComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmContainerComponent, RenderPosition.BEFOREEND);


    this._renderMovieCardsRoater();

    // this._renderTopRatedFilms();
    // this._renderMostCommentedFilms();
  };
};