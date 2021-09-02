import AbstractView from './abstract.js';

const createFooterFilmCounterTemplate = (CARDS) => (
  `<p>
  ${CARDS} movies inside
  </p>`
);

export default class FooterFilmCounter extends AbstractView {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createFooterFilmCounterTemplate(this._cards);
  }
}
