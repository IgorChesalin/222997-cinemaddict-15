import ProfileView from './view/profile.js';
import SiteMenuView from './view/site-menu.js';
import FilmsView from './view/Films.js';
import FilmCardView from './view/film-card.js';
import FooterFilmCounterView from './view/footer-count.js';
import FilmDetailsView from './view/film-details.js';
import CommentView from './view/comment.js';
import ShowMoreButtonView from './view/showmorebutton.js';
import { renderElement, RenderPosition } from './utils.js';
import { gengerateCard } from './mock/card.js';
import { gengerateComment } from './mock/comment.js';


const CARDS = 8;

const CARDS_PER_STEP = 5;

const OTHER_LISTS_CARDS = 2;
const COMMENTS = 5;

const cards = new Array(CARDS).fill().map(gengerateCard);
const comments = new Array(COMMENTS).fill().map(gengerateComment);


// Открыть попап
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


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');


renderElement(siteHeaderElement, new ProfileView().getElement(), RenderPosition.BEFOREEND);

renderElement(siteMainElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

renderElement(siteMainElement, new FilmsView().getElement(), RenderPosition.BEFOREEND);


// Карточки основной блок и кнопка показать еще
const siteFilmListTopElement = document.querySelectorAll('.films-list__container');
for (let i = 0; i < Math.min(cards.length, CARDS_PER_STEP); i++) {
  renderElement(siteFilmListTopElement[0], new FilmCardView(cards[i]).getElement(), RenderPosition.BEFOREEND);
}

if (cards.length > CARDS_PER_STEP) {
  let renderedCards = CARDS_PER_STEP;

  const mainFilmList = document.querySelector('.films-list');
  renderElement(mainFilmList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = mainFilmList.querySelector('.films-list__show-more');
  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCards, renderedCards + CARDS_PER_STEP)
      .forEach((card) => renderElement(siteFilmListTopElement[0], new FilmCardView(card).getElement(), RenderPosition.BEFOREEND));

    renderedCards += CARDS_PER_STEP;
    addPosterListener();

    if (renderedCards >= cards.length) {
      showMoreButton.remove();
    }
  });
}

// Карточки рейтинг
for (let i = 0; i < OTHER_LISTS_CARDS; i++) {
  renderElement(siteFilmListTopElement[1], new FilmCardView(cards[i]).getElement(), RenderPosition.BEFOREEND);
}

// Карточки комментарии
for (let i = 0; i < OTHER_LISTS_CARDS; i++) {
  renderElement(siteFilmListTopElement[2], new FilmCardView(cards[i]).getElement(), RenderPosition.BEFOREEND);
}

// Счетчик в футере
const siteFooterCounterElement = document.querySelector('.footer__statistics');
renderElement(siteFooterCounterElement, new FooterFilmCounterView(CARDS).getElement(), RenderPosition.BEFOREEND);

// Попап фильма
renderElement(siteMainElement, new FilmDetailsView(cards[0]).getElement(), RenderPosition.BEFOREEND);

// Комментарии
const popupCommentsContainer = document.querySelector('.film-details__comments-list');

comments.forEach((comment) => {
  renderElement(popupCommentsContainer, new CommentView(comment).getElement(), 'beforeend');
});


addPosterListener();
