import { createProfileTemplate } from './view/profile.js';
import { createSiteMenuTemplate } from './view/site-menu.js';
import { createFilmsTemplate } from './view/Films.js';
import { createFilmCardTemplate } from './view/Film-card.js';
import { createFooterFilmCounterTemplate } from './view/footer-count.js';
import { createFilmDetailsTemplate } from './view/film-details.js';


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');


render(siteHeaderElement, createProfileTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createFilmsTemplate(), 'beforeend');


const MAIN_LIST_CARDS = 5;
const OTHER_LISTS_CARDS = 2;

const siteFilmListTopElement = document.querySelectorAll('.films-list__container');

for (let i = 0; i < MAIN_LIST_CARDS; i++) {
  render(siteFilmListTopElement[0], createFilmCardTemplate(), 'beforeend');
}

for (let i = 0; i < OTHER_LISTS_CARDS; i++) {
  render(siteFilmListTopElement[1], createFilmCardTemplate(), 'beforeend');
}

for (let i = 0; i < OTHER_LISTS_CARDS; i++) {
  render(siteFilmListTopElement[2], createFilmCardTemplate(), 'beforeend');
}

const siteFooterCounterElement = document.querySelector('.footer__statistics');
render(siteFooterCounterElement, createFooterFilmCounterTemplate(), 'beforeend');
render(siteMainElement, createFilmDetailsTemplate(), 'beforeend');
