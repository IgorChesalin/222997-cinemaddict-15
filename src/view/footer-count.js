import { createElement } from '../utils.js';

const createFooterFilmCounterTemplate = (CARDS) => (
  `<p>
  ${CARDS} movies inside
  </p>`
);


export default class FooterFilmCounter {
  constructor(cards) {
    this._cards = cards;
    this._element = null;
  }

  getTemplate() {
    return createFooterFilmCounterTemplate(this._cards);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
