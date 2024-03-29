import { getRandomInt, getRandom, getRandomArrayElement } from './util.js';
import { generateComments } from './mock-comments.js';
import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
dayjs.extend(dayjsRandom);

//Данные для карточки
const posters = ['made-for-each-other.png', 'popeye-meets-sinbad.png', 'sagebrush-trail.jpg', 'santa-claus-conquers-the-martians.jpg', 'the-dance-of-life.jpg', 'the-great-flamarion.jpg', 'the-man-with-the-golden-arm.jpg'];
const titles = ['The God Father', 'Good Fellas', 'Shutter Island', 'Once Upon a Time in America', 'Casino', 'The Quick and the Dead', 'pulp Fiction'];
const genres = ['crime', 'drama', 'horror', 'comedy', 'action', 'triller'];
const descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];
const directors = ['Alfred Hitchcock', 'John Ford', 'Charles Chaplin', 'Akira Kurosawa'];
const writers = ['Billy Wilder', 'Ethan Coen', 'Robert Towne', 'Quentin Tarantino', 'Charlie Kaufman'];
const actors = ['Jack Nicholson', 'Marlon Brando', 'Robert De Niro', 'Al Pacino', 'Daniel Day-Lewis', 'Dustin Hoffman', 'Tom Hanks'];
const countries = ['USA', 'Russia', 'France', 'Japan', 'Germany'];
const ageRaitings = ['18+', '16+', '14+', '6+'];


//Генерация полей для карточки
const generateFilmDescription = () => {
  const description = []
  for (let i = 0; i < getRandomInt(1, 5); i++) {
    description.push(getRandomArrayElement(descriptions));
  }
  return description.join('');
}

const generateFilmWorkers = (workersGroup) => {
  const workers = []
  for (let i = 0; i < 3; i++) {
    workers.push(getRandomArrayElement(workersGroup));
  }
  return workers.join(',');
}

const getShortDescription = (string) => {
  if (string.length > 140) {
    return `${string.slice(0, 139)}...`;
  }
  return string;
};

const generateGenres = () => {
  const filmGenres = []
  for (let i = 0; i < 3; i++) {
    filmGenres.push(getRandomArrayElement(genres));
  }
  return filmGenres;
}

const setFilmCardControl = {
  basic(isActive) {
    if (isActive) {
      return `film-card__controls-item--active`;
    }
  },
  popup(isActive) {
    if (isActive) {
      return `film-details__control-button--active`;
    }
  }
}

//Генерация карточки фильма

const generateFilmCard = () => {
  const date = dayjs.between('1950-06-10T00:00:00', '2024-03-02T03:00:00');
  const duration = dayjs.between('1950-06-10T01:00:00', '1950-06-10T04:00:00');

  return {
    poster: getRandomArrayElement(posters),
    title: getRandomArrayElement(titles),
    raiting: getRandom(0, 10).toFixed(1),
    releaseDate: date,
    duration: duration.format('h[h] m[min]'),
    genre: generateGenres(),
    description: generateFilmDescription(),
    comments: generateComments(),
    filter: {
      isFavorite: Boolean(getRandomInt(0, 1)),
      isWatched: Boolean(getRandomInt(0, 1)),
      isWatchList: Boolean(getRandomInt(0, 1)),
    },
    director: getRandomArrayElement(directors),
    writers: generateFilmDescription(writers),
    actors: generateFilmWorkers(actors),
    country: getRandomArrayElement(countries),
    ageRaiting: getRandomArrayElement(ageRaitings),
  }
}

export { generateFilmCard, getShortDescription, setFilmCardControl };