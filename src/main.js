import EmptyListView from './view/empty-list.js';
import ProfileView from './view/profile.js';
import SiteMenuView from './view/site-menu.js';
import FilmsView from './view/Films.js';
import ShowMoreButtonView from './view/showmorebutton.js';
import FilmCardView from './view/film-card.js';
import FooterFilmCounterView from './view/footer-count.js';
import FilmDetailsView from './view/film-details.js';
import CommentView from './view/comment.js';
import { render, RenderPosition, checkEsc } from './utils.js';
import { gengerateCard } from './mock/card.js';
import { gengerateComment } from './mock/comment.js';


const CARDS = 8;
const CARDS_PER_STEP = 5;
const OTHER_LISTS_CARDS = 2;
const COMMENTS = 10;

const cards = new Array(CARDS).fill().map(gengerateCard);
const comments = new Array(COMMENTS).fill().map(gengerateComment);
const commentsCount = comments.length;

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

render(siteMainElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

const onFilmDetailsEscKeyDown = (evt) => {
  if(checkEsc(evt)) {
    const filmDetails = document.querySelector('.film-details');
    siteMainElement.removeChild(filmDetails);
    document.querySelector('body').classList.remove('hide-overflow');
    document.removeEventListener('keydown', onFilmDetailsEscKeyDown);
  }
};

const onFilmDetailsCloseClick = () => {
  const filmDetailsCloseButton = document.querySelector('.film-details__close-btn');
  document.querySelector('body').classList.add('hide-overflow');

  filmDetailsCloseButton.addEventListener('click', () => {
    const filmDetails = document.querySelector('.film-details');
    siteMainElement.removeChild(filmDetails);
    document.querySelector('body').classList.remove('hide-overflow');
    document.removeEventListener('keydown', onFilmDetailsEscKeyDown);
  });
};


const onFilmCardClick = (evt) => {
  if (evt.target.tagName === 'H3' || evt.target.tagName === 'A' || evt.target.tagName === 'IMG') {
    document.addEventListener('keydown', onFilmDetailsEscKeyDown);
    let filmDetails = document.querySelector('.film-details');

    if (filmDetails) {
      filmDetails.remove();
    }

    siteMainElement.appendChild(new FilmDetailsView(evt.target.parentElement.data, comments).getElement());

    filmDetails = document.querySelector('.film-details');

    const popupCommentsContainer = document.querySelector('.film-details__comments-list');

    comments.forEach((comment) => {
      render(popupCommentsContainer, new CommentView(comment).getElement(), 'beforeend');
    });

    onFilmDetailsCloseClick();

  }
};


if (cards.length > 0) {

  render(siteMainElement, new FilmsView().getElement(), RenderPosition.BEFOREEND);
  render(siteHeaderElement, new ProfileView().getElement(), RenderPosition.BEFOREEND);

  const siteFilmListContainer = document.querySelectorAll('.films-list__container');
  const mainFilmList = siteFilmListContainer[0];
  const TopRatedFilmList = siteFilmListContainer[1];
  const MostCommentedFilmList = siteFilmListContainer[2];
  for (let i = 0; i < Math.min(cards.length, CARDS_PER_STEP); i++) {
    const element = new FilmCardView(cards[i], commentsCount).getElement();
    element.addEventListener('click', onFilmCardClick);
    render(mainFilmList, element, RenderPosition.BEFOREEND);
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

      if (renderedCards >= cards.length) {
        showMoreButton.remove();
      }
    });
  }

  for (let i = 0; i < OTHER_LISTS_CARDS; i++) {
    const element = new FilmCardView(cards[i], commentsCount).getElement();
    element.addEventListener('click', onFilmCardClick);
    render(TopRatedFilmList, element, RenderPosition.BEFOREEND);
  }

  for (let i = 0; i < OTHER_LISTS_CARDS; i++) {
    const element = new FilmCardView(cards[i], commentsCount).getElement();
    element.addEventListener('click', onFilmCardClick);
    render(MostCommentedFilmList, element, RenderPosition.BEFOREEND);
  }

} else {
  render(siteMainElement, new EmptyListView().getElement(), RenderPosition.BEFOREEND);
}

// Счетчик в футере
const siteFooterCounterElement = document.querySelector('.footer__statistics');
render(siteFooterCounterElement, new FooterFilmCounterView(CARDS).getElement(), RenderPosition.BEFOREEND);
