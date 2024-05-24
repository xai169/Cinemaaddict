import Observer from '../utils/observer.js';
import dayjs from 'dayjs';

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(updateType, movies) {
    this._movies = movies.slice();

    this._notify(updateType);
  }

  getMovies() {
    return this._movies;
  }

  updateMovie = (updateType, update) => {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addMovieComment = (updateType, update) => {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  deleteMovieComment = (updateType, update) => {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(movie) {

    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        comments: [],
        poster: movie.film_info.poster,
        title: movie.film_info.title,
        alternativeTitle: movie.film_info.alternative_title,
        raiting: movie.film_info.total_rating,
        releaseDate: dayjs(movie.film_info.release.date),
        duration: movie.film_info.runtime,
        genre: movie.film_info.genre,
        description: movie.film_info.description,
        director: movie.film_info.director,
        writers: movie.film_info.writers,
        actors: movie.film_info.actors,
        country: movie.film_info.release.release_country,
        ageRaiting: movie.film_info.age_rating,
        filter: {
          isFavorite: movie.user_details.favorite,
          isWatched: movie.user_details.already_watched,
          isWatchList: movie.user_details.watchlist,
          watchingDate: movie.user_details.watching_date,
        },
      }
    )

    delete adaptedMovie.film_info;
    delete adaptedMovie.user_details;
    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        'film_info': {
          'alternative_title': movie.alternativeTitle,
          'poster': movie.poster,
          'title': movie.title,
          'total_rating': movie.raiting,
          'runtime': movie.duration,
          'genre': movie.genre,
          'description': movie.description,
          'director': movie.director,
          'writers': movie.writers,
          'actors': movie.actors,
          'age_rating': movie.ageRaiting,
          'release': {
            'date': movie.releaseDate.toISOString(),
            'release_country': movie.country,
          }
        },
        user_details: {
          watchlist: movie.filter.isWatchList,
          already_watched: movie.filter.isWatched,
          watching_date: movie.filter.watchingDate,
          favorite: movie.filter.isFavorite,
        },
      }
    )
    delete adaptedMovie.poster;
    delete adaptedMovie.title;
    delete adaptedMovie.raiting;
    delete adaptedMovie.duration;
    delete adaptedMovie.genre;
    delete adaptedMovie.description;
    delete adaptedMovie.director;
    delete adaptedMovie.writers;
    delete adaptedMovie.actors;
    delete adaptedMovie.ageRaiting;
    delete adaptedMovie.releaseDate;
    delete adaptedMovie.country;
    delete adaptedMovie.filter;
    return adaptedMovie;
  }
}