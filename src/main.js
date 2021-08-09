import { createProfileTemplate } from './view/profile.js';
import { createSiteMenuTemplate } from './view/site-menu.js';
import { createFilmsTemplate } from './view/Films.js';
import { createFilmCardTemplate } from './view/Film-card.js';
import { createFooterFilmCounterTemplate } from './view/footer-count.js';
import { createFilmDetailsTemplate } from './view/film-details.js';
import { createCommentTemplate } from './view/comment.js';
import { gengerateCard } from './mock/card.js';
import { gengerateComment } from './mock/comment.js';


const CARDS = 15;
const COMMENTS = 5;
const MAIN_LIST_CARDS = 15;
const OTHER_LISTS_CARDS = 2;

const cards = new Array(CARDS).fill().map(gengerateCard);
const comments = new Array(COMMENTS).fill().map(gengerateComment);


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');


render(siteHeaderElement, createProfileTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createFilmsTemplate(), 'beforeend');


const siteFilmListTopElement = document.querySelectorAll('.films-list__container');

for (let i = 0; i < MAIN_LIST_CARDS; i++) {
  render(siteFilmListTopElement[0], createFilmCardTemplate(cards[i]), 'beforeend');
}

for (let i = 0; i < OTHER_LISTS_CARDS; i++) {
  render(siteFilmListTopElement[1], createFilmCardTemplate(cards[i]), 'beforeend');
}

for (let i = 0; i < OTHER_LISTS_CARDS; i++) {
  render(siteFilmListTopElement[2], createFilmCardTemplate(cards[i]), 'beforeend');
}

const siteFooterCounterElement = document.querySelector('.footer__statistics');
render(siteFooterCounterElement, createFooterFilmCounterTemplate(), 'beforeend');

render(siteMainElement, createFilmDetailsTemplate(cards[0]), 'beforeend');


const popupCommentsContainer = document.querySelector('.film-details__comments-list');
render(popupCommentsContainer, createCommentTemplate(comments), 'beforeend');
