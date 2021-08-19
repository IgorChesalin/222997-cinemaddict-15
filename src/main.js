import ProfileView from './view/profile.js';
import SiteMenuView from './view/site-menu.js';
import FilmsView from './view/Films.js';
import ShowMoreButtonView from './view/showmorebutton.js';
import FilmCardView from './view/film-card.js';
import FooterFilmCounterView from './view/footer-count.js';
import FilmDetailsView from './view/film-details.js';
import CommentView from './view/comment.js';
import { render, RenderPosition } from './utils.js';
import { gengerateCard } from './mock/card.js';
import { gengerateComment } from './mock/comment.js';


const CARDS = 8;

const CARDS_PER_STEP = 5;

const OTHER_LISTS_CARDS = 2;
const COMMENTS = 5;

const cards = new Array(CARDS).fill().map(gengerateCard);
const comments = new Array(COMMENTS).fill().map(gengerateComment);

const siteMainElement = document.querySelector('.main');

// Открыть попап
const addPosterListener = () => {
  const filmDetailsOpenClick = document.querySelectorAll('.film-card__poster');
  console.log(filmDetailsOpenClick);
  // const filmDetailsContainer = document.querySelector('.film-details');

  filmDetailsOpenClick.forEach((item) => {
    item.addEventListener('click', () => {
      const test = new FilmDetailsView(cards[0]).getElement();
      siteMainElement.appendChild(test);

      document.querySelector('body').classList.add('hide-overflow');
    });

    // const filmDetailsCloseButton = document.querySelector('.film-details__close-btn');
    // filmDetailsCloseButton.addEventListener('click', () => {
    //   const FilmDetails = document.querySelector('.film-details');
    //   siteMainElement.removeChild(FilmDetails);
    //   document.querySelector('body').classList.remove('hide-overflow');
    // });
  });
};


const siteHeaderElement = document.querySelector('.header');


render(siteHeaderElement, new ProfileView().getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilmsView().getElement(), RenderPosition.BEFOREEND);


// Карточки основной блок и кнопка показать еще
const siteFilmListContainer = document.querySelectorAll('.films-list__container');
const mainFilmList = siteFilmListContainer[0];
const TopRatedFilmList = siteFilmListContainer[1];
const MostCommentedFilmList = siteFilmListContainer[2];


for (let i = 0; i < Math.min(cards.length, CARDS_PER_STEP); i++) {
  render(mainFilmList, new FilmCardView(cards[i]).getElement(), RenderPosition.BEFOREEND);
}

if (cards.length > CARDS_PER_STEP) {
  let renderedCards = CARDS_PER_STEP;

  const mainFilmListContainer = document.querySelector('.films-list');
  render(mainFilmListContainer, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = mainFilmListContainer.querySelector('.films-list__show-more');
  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCards, renderedCards + CARDS_PER_STEP)
      .forEach((card) => render(siteFilmListContainer[0], new FilmCardView(card).getElement(), RenderPosition.BEFOREEND));

    renderedCards += CARDS_PER_STEP;
    // addPosterListener();

    if (renderedCards >= cards.length) {
      showMoreButton.remove();
    }
  });
}

// Карточки рейтинг
for (let i = 0; i < OTHER_LISTS_CARDS; i++) {
  render(TopRatedFilmList, new FilmCardView(cards[i]).getElement(), RenderPosition.BEFOREEND);
}

// Карточки комментарии
for (let i = 0; i < OTHER_LISTS_CARDS; i++) {
  render(MostCommentedFilmList, new FilmCardView(cards[i]).getElement(), RenderPosition.BEFOREEND);
}

// Счетчик в футере
const siteFooterCounterElement = document.querySelector('.footer__statistics');
render(siteFooterCounterElement, new FooterFilmCounterView(CARDS).getElement(), RenderPosition.BEFOREEND);

// Попап фильма
// render(siteMainElement, new FilmDetailsView(cards[0]).getElement(), RenderPosition.BEFOREEND);

// Комментарии
const popupCommentsContainer = document.querySelector('.film-details__comments-list');

// comments.forEach((comment) => {
//   render(popupCommentsContainer, new CommentView(comment).getElement(), 'beforeend');
// });


//добавляем попап через метод апнчайлд


addPosterListener();
