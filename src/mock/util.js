//Вспомогательные функции

// ESCAPE
const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
}

const checkEsc = (evt) => {
  return evt.key === Keys.ESC || evt.key === Keys.ESCAPE;
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

//Функция получения рандомного элемента из массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

//Функция сравнения количества комментов у фильмов
const compareCommentsNumber = (filmCardA, filmCardB) => {
  return filmCardB.comments.length - filmCardA.comments.length;
};

//функция сравнения рейтинга у фильмов
const compareFilmRaiting = (filmCardA, filmCardB) => {
  return filmCardB.raiting - filmCardA.raiting;
};

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

//Функция отрисовки разметки
const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

//Функция создания элемента, заполняемого разметкой
const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export { getRandomInt, getRandom, getRandomArrayElement, compareCommentsNumber, compareFilmRaiting, createElement, render, RenderPosition, checkEsc };