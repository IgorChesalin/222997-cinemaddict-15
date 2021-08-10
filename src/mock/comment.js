const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateEmoji = () => {
  const links = [
    'angry.png',
    'puke.png',
    'sleeping.png',
    'smile.png',
  ];

  return links[getRandomInteger(0, links.length - 1)];
};

const generateText = () => {
  const text = [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
  ];

  return text[getRandomInteger(0, text.length - 1)];
};

const generateAuthor = () => {
  const author = [
    'John Doe',
    'Tim Macoveev',
    'Denis Kim',
    'John Snow',
    'Igor Petrenko',
  ];

  return author[getRandomInteger(0, author.length - 1)];
};

export const gengerateComment = () => ({
  emoji: generateEmoji(),
  text: generateText(),
  author: generateAuthor(),
  day: '12-45',
});
