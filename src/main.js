import { createProfileTemplate } from './view/profile.js';
import { createSiteMenuTemplate } from './view/site-menu.js';
import { createFilmsTemplate } from './view/Films.js';
import { createFilmCardTemplate } from './view/Film-card.js';
import { createFooterFilmCounterTemplate } from './view/footer-count.js';
import { createFilmDetailsTemplate } from './view/film-details.js';
import { createCommentTemplate } from './view/comment.js';
import { createShowMoreButtonTemplate } from './view/showmorebutton';


import { gengerateCard } from './mock/card.js';
import { gengerateComment } from './mock/comment.js';


const CARDS = 21;

const CARDS_PER_STEP = 5;

const OTHER_LISTS_CARDS = 2;
const COMMENTS = 5;

const cards = new Array(CARDS).fill().map(gengerateCard);
const comments = new Array(COMMENTS).fill().map(gengerateComment);


// Open details
const addPosterListener = () => {
  const filmDetailsOpenClick = document.querySelectorAll('.film-card__poster');
  const filmDetailsContainer = document.querySelector('.film-details');

  filmDetailsOpenClick.forEach((item) => {
    item.addEventListener('click', () => {
      filmDetailsContainer.classList.remove('visually-hidden');
    });

    const filmDetailsCloseButton = filmDetailsContainer.querySelector('.film-details__close-btn');
    filmDetailsCloseButton.addEventListener('click', () => {
      filmDetailsContainer.classList.add('visually-hidden');
    });
  });
};


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');


render(siteHeaderElement, createProfileTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createFilmsTemplate(), 'beforeend');


const siteFilmListTopElement = document.querySelectorAll('.films-list__container');


// Карточки основной блок

for (let i = 0; i < Math.min(cards.length, CARDS_PER_STEP); i++) {
  render(siteFilmListTopElement[0], createFilmCardTemplate(cards[i]), 'beforeend');
}

if (cards.length > CARDS_PER_STEP) {
  let renderedCards = CARDS_PER_STEP;

  const mainFilmList = document.querySelector('.films-list');
  render(mainFilmList, createShowMoreButtonTemplate(), 'beforeend');

  const showMoreButton = mainFilmList.querySelector('.films-list__show-more');
  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCards, renderedCards + CARDS_PER_STEP)
      .forEach((card) => render(siteFilmListTopElement[0], createFilmCardTemplate(card), 'beforeend'));

    renderedCards += CARDS_PER_STEP;
    addPosterListener();

    if (renderedCards >= cards.length) {
      showMoreButton.remove();
    }
  });
}


for (let i = 0; i < OTHER_LISTS_CARDS; i++) {
  render(siteFilmListTopElement[1], createFilmCardTemplate(cards[i]), 'beforeend');
}

for (let i = 0; i < OTHER_LISTS_CARDS; i++) {
  render(siteFilmListTopElement[2], createFilmCardTemplate(cards[i]), 'beforeend');
}

const siteFooterCounterElement = document.querySelector('.footer__statistics');
render(siteFooterCounterElement, createFooterFilmCounterTemplate(CARDS), 'beforeend');

render(siteMainElement, createFilmDetailsTemplate(cards[0]), 'beforeend');


const popupCommentsContainer = document.querySelector('.film-details__comments-list');

comments.forEach((item) => {
  render(popupCommentsContainer, createCommentTemplate(item), 'beforeend');
});


addPosterListener();
