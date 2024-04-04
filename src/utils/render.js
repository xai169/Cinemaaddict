import Abstract from "../view/abstract";

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

//Функция отрисовки разметки
const render = (container, element, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

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

const append = (element, child) => {

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  element.appendChild(child);
};

const removeChild = (element, child) => {

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  element.removeChild(child);
};

const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

export { createElement, render, RenderPosition, append, remove, removeChild };