import { getRandomInt, getRandomArrayElement } from './util.js';
import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
dayjs.extend(dayjsRandom);

const emojis = ['angry.png', 'puke.png', 'sleeping.png', 'smile.png'];
const texts = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];
const authorNames = ['Patrik', 'Liza', 'Pashok', 'Barak Obama'];

const createComment = () => {
  const commentsDate = dayjs.between('2023-03-18T03:00:00', dayjs()).format('YYYY/MM/DD HH:MM');

  return {
    emoji: getRandomArrayElement(emojis),
    text: getRandomArrayElement(texts),
    author: getRandomArrayElement(authorNames),
    date: commentsDate,
  }
};

const generateComments = () => {
  return new Array(getRandomInt(0, 5)).fill().map(createComment);

};

export { generateComments };