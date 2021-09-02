import { createElement } from '../utils.js';
import { isActive } from '../utils.js';
import AbstractView from './abstract.js';

const createFilmCardTemplate = (card, commentsCount) => {
// не срабатывают фильтры просмотрено и тд
  const { title, id, description, rating, year, runtime, poster, genres, isWatchlist, isWatched, isFavorite } = card;
  return `<article class="film-card" id="${id}">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${runtime}</span>
    <span class="film-card__genre">${genres}</span>
  </p>
  <img src="./images/posters/${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${commentsCount} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isActive(isWatchlist)}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isActive(isWatched)}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${isActive(isFavorite)}" type="button">Mark as favorite</button>
  </div>
  </article>`;
};

// непонятно как тут быть т.к. передает мета данные .дата
export default class FilmCard extends AbstractView {
  constructor(cards, commentsCount) {
    super();
    this._cards = cards;
    this._commentsCount = commentsCount;
  }

  getTemplate() {
    return createFilmCardTemplate(this._cards, this._commentsCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._element.data = this._cards;
    }

    return this._element;
  }
}
