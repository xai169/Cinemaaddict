//Функция сравнения количества комментов у фильмов
const compareCommentsNumber = (filmCardA, filmCardB) => {
  return filmCardB.comments.length - filmCardA.comments.length;
};

//функция сравнения рейтинга у фильмов
const compareFilmRaiting = (filmCardA, filmCardB) => {
  return filmCardB.raiting - filmCardA.raiting;
};

export { compareCommentsNumber, compareFilmRaiting };