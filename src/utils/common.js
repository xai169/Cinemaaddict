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

export { getRandomInt, getRandom, getRandomArrayElement, checkEsc };