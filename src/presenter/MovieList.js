import FilmSectionView from "../view/film-section.js";
import FilmListView from "../view/film-list.js";
import FilmContainerView from "../view/film-container.js";
import SortView from "../view/sort.js";
import ShowMoreButtonView from "../view/showmore-button.js";
import TopRatedFilmsView from "../view/toprated-films.js";
import MostCommentedFilmsView from "../view/mostcommented-films.js";
import EmptyFilmListView from "../view/empty-film-list.js";
import LoadingView from "../view/loading.js";
import { compareCommentsNumber, compareFilmRaiting, compareFilmDate } from '../utils/film-cards.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import MoviePresenter from './Movie.js';
import { SortType, UserAction, UpdateType, FilterType, CommentState } from "../const.js";
import { filter, userRank } from "../utils/filter.js";
import MoviesModel from '../model/movies.js';

const EXTRA_FILMS_COUNT = 2;
const FILMS_START_COUNT = 5;
const FILM_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer, moviesModel, filterModel, api) {
    this._movieListContainer = movieListContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._moviePresenter = {};
    this._topRatedPresenter = {};
    this._mostCommentedPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;

    this._renderedFilmsCount = FILMS_START_COUNT;
    this._emptyListComponent = new EmptyFilmListView();
    this._filmSectionComponent = new FilmSectionView();
    this._filmListComponent = new FilmListView();
    this._filmContainerComponent = new FilmContainerView();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsView();
    this._topRatedFilmsComponent = new TopRatedFilmsView();
    this._topRatedList = new FilmContainerView();
    this._mostCommentedList = new FilmContainerView();
    this._loadingComponent = new LoadingView();

    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._showMoreButtonHandler = this._showMoreButtonHandler.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._clearFilmsList({ resetRenderedMoviesCount: true, resetSortType: true });

    this._moviesModel.deleteObserver(this._handleModelEvent);
    this._filterModel.deleteObserver(this._handleModelEvent);
  }

  _handleViewAction(actionType, updateType, update, comment) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._api.updateMovie(update).then((response) => {
          this._moviesModel.updateMovie(updateType, response);
        })
        break
      case UserAction.ADD_MOVIE_COMMENT:
        this._api.addComment(update, comment)
          .then((response) => {
            this._moviesModel.addMovieComment(updateType, MoviesModel.adaptToClient(response.movie));
          })
          .catch(() => {
            this._moviePresenter[update.id].setViewState(CommentState.ABORTING);
          })
        break
      case UserAction.DELETE_MOVIE_COMMENT:
        this._moviePresenter[update.id].setViewState(CommentState.DELETING, comment);
        this._api.deleteComment(comment)
          .then(() => {
            this._moviesModel.deleteMovieComment(updateType, update);
          })
          .catch(() => {
            this._moviePresenter[update.id].setViewState(CommentState.ABORTING);
          })
        break

    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        Object
          .values(this._moviePresenter)
          .forEach((presenter) => {
            if (presenter._movieCard.id === data.id) {
              this._api.getComments(data)
                .then((comments) => {
                  const popupScrollPostition = document.querySelector('.film-details').scrollTop;
                  this._moviePresenter[data.id].init(data);
                  this._moviePresenter[data.id]._renderFilmDetails(data, comments);
                  if (document.querySelectorAll('.film-details').length > 1) {
                    document.querySelectorAll('.film-details')[0].remove();
                  }
                  document.querySelector('.film-details').scrollTop = popupScrollPostition;
                })
            }
          });

        Object
          .values(this._topRatedPresenter)
          .forEach((presenter) => {
            if (presenter._movieCard.id === data.id) {
              this._api.getComments(data)
                .then((comments) => {
                  const popupScrollPostition = document.querySelector('.film-details').scrollTop;
                  this._topRatedPresenter[data.id].init(data);
                  this._topRatedPresenter[data.id]._renderFilmDetails(data, comments);
                  if (document.querySelectorAll('.film-details').length > 1) {
                    document.querySelectorAll('.film-details')[0].remove();
                  }
                  document.querySelector('.film-details').scrollTop = popupScrollPostition;
                })
            }
          });

        Object
          .values(this._mostCommentedPresenter)
          .forEach((presenter) => {
            if (presenter._movieCard.id === data.id) {
              this._api.getComments(data)
                .then((comments) => {
                  const popupScrollPostition = document.querySelector('.film-details').scrollTop;
                  this._mostCommentedPresenter[data.id].init(data);
                  this._mostCommentedPresenter[data.id]._renderFilmDetails(data, comments);
                  if (document.querySelectorAll('.film-details').length > 1) {
                    document.querySelectorAll('.film-details')[0].remove();
                  }
                  document.querySelector('.film-details').scrollTop = popupScrollPostition;
                })
            }
          });
        break
      case UpdateType.MINOR:
        this._clearFilmsList();
        this._renderMovieList();
        break
      case UpdateType.MAJOR:
        this._clearFilmsList({ resetRenderedMoviesCount: true, resetSortType: true });
        this._renderMovieList();
        break
      case UpdateType.CLEAR:
        this._clearFilmsList({ resetRenderedMoviesCount: true, resetSortType: true });
        break
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderMovieList();
        break
    }
  }

  _getMovies() {
    const filterType = this._filterModel.getFilter();
    if (filterType === FilterType.STATS) {
      return this._moviesModel.getMovies();
    }
    const movies = this._moviesModel.getMovies();
    const filtredMovies = filter[filterType](movies);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredMovies.slice().sort(compareFilmDate);
      case SortType.RAITING:
        return filtredMovies.slice().sort(compareFilmRaiting);
    }

    this._mostCommentedFilms = this._moviesModel.getMovies().slice().sort(compareCommentsNumber);
    this._topRatedFilms = this._moviesModel.getMovies().slice().sort(compareFilmRaiting);

    return filtredMovies;
  }

  _renderMovieCard(movieCard) {
    const moviePresenter = new MoviePresenter(this._filmContainerComponent, this._handleViewAction, this._handleModeChange, this._api);
    moviePresenter.init(movieCard);
    this._moviePresenter[movieCard.id] = moviePresenter;
  };

  _renderTopRatedCard(movieCard) {
    const topRatedPresenter = new MoviePresenter(this._topRatedList, this._handleViewAction, this._handleModeChange, this._api);
    topRatedPresenter.init(movieCard);
    this._topRatedPresenter[movieCard.id] = topRatedPresenter;
  }

  _renderMostCommentedCard(movieCard) {
    const mostCommentedPresenter = new MoviePresenter(this._mostCommentedList, this._handleViewAction, this._handleModeChange, this._api);
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
    remove(this._loadingComponent);
    remove(this._filmSectionComponent);
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

  _renderLoading() {
    render(this._movieListContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

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

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._getMovies().length === 0) {
      this._renderEmptyList();
      return;
    }

    this._renderSort();

    render(this._movieListContainer, this._filmSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmSectionComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmContainerComponent, RenderPosition.BEFOREEND);

    this._renderMovieCardsRoster();

    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  };
};