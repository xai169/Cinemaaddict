//Функция сравнения количества комментов у фильмов
const compareCommentsNumber = (filmCardA, filmCardB) => {
  return filmCardB.comments.length - filmCardA.comments.length;
};

//функция сравнения рейтинга у фильмов
const compareFilmRaiting = (filmCardA, filmCardB) => {
  return filmCardB.raiting - filmCardA.raiting;
};

//Функция сравнения даты у фильмов
const compareFilmDate = (filmCardA, filmCardB) => {
  return filmCardB.releaseDate.format('YYYY') - filmCardA.releaseDate.format('YYYY');
};

const compareCommentDate = (commentA, commentB) => {
  return commentB.date - commentA.date;
};

const getRunTime = (duration) => {
  const hours = Math.round(duration / 60);
  const minutes = duration % 60;

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}min`
}

export { compareCommentsNumber, compareFilmRaiting, compareFilmDate, compareCommentDate, getRunTime };