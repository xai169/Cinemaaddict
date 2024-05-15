import FilmSectionView from "../view/film-section.js";
import FilmListView from "../view/film-list.js";
import FilmContainerView from "../view/film-container.js";
import SortView from "../view/sort.js";
import ShowMoreButtonView from "../view/showmore-button.js";
import TopRatedFilmsView from "../view/toprated-films.js";
import MostCommentedFilmsView from "../view/mostcommented-films.js";
import EmptyFilmListView from "../view/empty-film-list.js";
import { compareCommentsNumber, compareFilmRaiting, compareFilmDate } from '../utils/film-cards.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import MoviePresenter from './Movie.js';
import { SortType, UserAction, UpdateType } from "../const.js";

const EXTRA_FILMS_COUNT = 2;
const FILMS_START_COUNT = 5;
const FILM_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer, moviesModel) {
    this._moviesModel = moviesModel;
    this._movieListContainer = movieListContainer;
    this._moviePresenter = {};
    this._topRatedPresenter = {};
    this._mostCommentedPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._renderedFilmsCount = FILMS_START_COUNT;
    this._emptyListComponent = new EmptyFilmListView();
    this._filmSectionComponent = new FilmSectionView();
    this._filmListComponent = new FilmListView();
    this._filmContainerComponent = new FilmContainerView();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsView();
    this._topRatedFilmsComponent = new TopRatedFilmsView();
    this._topRatedList = new FilmContainerView();
    this._mostCommentedList = new FilmContainerView();

    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._showMoreButtonHandler = this._showMoreButtonHandler.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    if (this._getMovies().length === 0) {
      this._renderEmptyList();
      return;
    }

    this._renderMovieList();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._moviesModel.updateMovie(updateType, update);
        break
      case UserAction.ADD_MOVIE_COMMENT:
        // Здесь будет способ добавление нового комментария
        break
      case UserAction.DELETE_MOVIE_COMMENT:
        // Здесь будет способ удаления комментария
        break

    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._moviePresenter[data.id].init(data);
        this._topRatedPresenter[data.id].init(data);
        this._mostCommentedPresenter[data.id].init(data);
        break
      case UpdateType.MINOR:
        this._clearFilmsList();
        this._renderMovieList();
        // Перерисовка спика фильмов
        break
      case UpdateType.MAJOR:
        // Перерисовка всей страницы
        break
    }
  }

  _getMovies() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._moviesModel.getMovies().slice().sort(compareFilmDate);
      case SortType.RAITING:
        return this._moviesModel.getMovies().slice().sort(compareFilmRaiting);
    }

    this._mostCommentedFilms = this._moviesModel.getMovies().slice().sort(compareCommentsNumber);
    this._topRatedFilms = this._moviesModel.getMovies().slice().sort(compareFilmRaiting);

    return this._moviesModel.getMovies();
  }

  // _handleMovieCardChange(updatedMovieCard) {
  //   this._filmCards = updateItem(this._filmCards, updatedMovieCard);

  //   Object
  //     .values(this._moviePresenter)
  //     .forEach((presenter) => {
  //       if (presenter._movieCard.id === updatedMovieCard.id) {
  //         this._moviePresenter[updatedMovieCard.id].init(updatedMovieCard);
  //       }
  //     });

  //   Object
  //     .values(this._topRatedPresenter)
  //     .forEach((presenter) => {
  //       if (presenter._movieCard.id === updatedMovieCard.id) {
  //         this._topRatedPresenter[updatedMovieCard.id].init(updatedMovieCard);
  //       }
  //     });

  //   Object
  //     .values(this._mostCommentedPresenter)
  //     .forEach((presenter) => {
  //       if (presenter._movieCard.id === updatedMovieCard.id) {
  //         this._mostCommentedPresenter[updatedMovieCard.id].init(updatedMovieCard);
  //       }
  //     });
  // };

  _renderMovieCard(movieCard) {
    const moviePresenter = new MoviePresenter(this._filmContainerComponent, this._handleViewAction, this._handleModeChange);
    moviePresenter.init(movieCard);
    this._moviePresenter[movieCard.id] = moviePresenter;
  };

  _renderTopRatedCard(movieCard) {
    const topRatedPresenter = new MoviePresenter(this._topRatedList, this._handleViewAction, this._handleModeChange);
    topRatedPresenter.init(movieCard);
    this._topRatedPresenter[movieCard.id] = topRatedPresenter;
  }

  _renderMostCommentedCard(movieCard) {
    const mostCommentedPresenter = new MoviePresenter(this._mostCommentedList, this._handleViewAction, this._handleModeChange);
    mostCommentedPresenter.init(movieCard);
    this._mostCommentedPresenter[movieCard.id] = mostCommentedPresenter;
  }

  _handleModeChange() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _clearFilmsList({ resetRenderedMoviesCount = false, resetSortType = false } = {}) {
    const movieCount = this._getMovies().length;

    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());

    this._moviePresenter = {};

    Object
      .values(this._topRatedPresenter)
      .forEach((presenter) => presenter.destroy());

    this._topRatedPresenter = {};

    Object
      .values(this._mostCommentedPresenter)
      .forEach((presenter) => presenter.destroy());

    this._mostCommentedPresenter = {};

    if (resetRenderedMoviesCount) {
      this._renderedFilmsCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmsCount = Math.min(movieCount, this._renderedFilmsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }

    remove(this._showMoreButtonComponent);
    remove(this._sortComponent);
    remove(this._emptyListComponent);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
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
    const movieCount = this._getMovies().length;
    const newRenderedMovieCount = Math.min(movieCount, this._renderedFilmsCount + FILM_COUNT_PER_STEP)
    const movies = this._getMovies().slice(this._renderedFilmsCount, newRenderedMovieCount);

    this._renderMovieCards(movies);
    this._renderedFilmsCount = newRenderedMovieCount;

    if (this._renderedFilmsCount >= movieCount) {
      remove(this._showMoreButtonComponent);
    }
  };

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      remove(this._showMoreButtonComponent);
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();

    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._showMoreButtonHandler);
  };

  _renderMostCommentedFilms() {
    render(this._filmSectionComponent, this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);
    render(this._mostCommentedFilmsComponent, this._mostCommentedList, RenderPosition.BEFOREEND);
    this._mostCommentedFilms
      .slice(0, EXTRA_FILMS_COUNT)
      .forEach((filmCard) => {
        this._renderMostCommentedCard(filmCard);
      })
  };

  _renderTopRatedFilms() {
    render(this._filmSectionComponent, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
    render(this._topRatedFilmsComponent, this._topRatedList, RenderPosition.BEFOREEND);
    this._topRatedFilms
      .slice(0, EXTRA_FILMS_COUNT)
      .forEach((filmCard) => {
        this._renderTopRatedCard(filmCard);
      })
  };

  _renderMovieCards(movies) {
    movies.forEach((movie) => this._renderMovieCard(movie));
  };

  _renderMovieCardsRoster() {
    const movieCount = this._getMovies().length;
    const movies = this._getMovies().slice(0, Math.min(movieCount, this._renderedFilmsCount));
    this._renderMovieCards(movies);

    if (movieCount > FILMS_START_COUNT) {
      this._renderShowMoreButton();
    }
  }

  _renderMovieList() {

    this._renderSort();

    render(this._movieListContainer, this._filmSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmSectionComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmContainerComponent, RenderPosition.BEFOREEND);

    this._renderMovieCardsRoster();

    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  };
};