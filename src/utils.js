export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};


export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};


// export const renderTemplate = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };


export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};


export const isActive = (value) => value === true ? 'film-details__control-button--active' : '';

export const getRandomFloat = (min, max, digit = 2) => {
  if (max < min) {
    [min, max] = [max, min];
  }
  if (max > min && min >= 0) {
    return (Math.random() * (max - min) + min).toFixed(digit);
  }
};


export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

export const checkEsc = (evt) => (evt.key === Keys.ESC || evt.key === Keys.ESCAPE);
