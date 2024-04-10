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

const replace = (newElement, oldElement) => {
  if (newElement instanceof Abstract) {
    newElement = newElement.getElement();
  }

  if (oldElement instanceof Abstract) {
    oldElement = oldElement.getElement();
  }

  const parentElement = oldElement.parentElement;

  if (parentElement === null || oldElement === null || newElement === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  if (parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
}

export { createElement, render, RenderPosition, append, remove, removeChild, replace };