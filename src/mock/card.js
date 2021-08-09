const getRandomFloat = (min, max, digit = 2) => {
  if (max < min) {
    [min, max] = [max, min];
  }
  if (max > min && min >= 0) {
    return (Math.random() * (max - min) + min).toFixed(digit);
  }
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  return shuffle(descriptions).slice(0, getRandomInteger(1, 5)).join(' ');
};

const generateTitle = () => {
  const titles = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'Santa Claus Conquers the Martians',
    'Made for Each Other',
    'The Great Flamarion',
  ];

  return titles[getRandomInteger(0, titles.length - 1)];
};

const generatePosterLink = () => {
  const links = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  return links[getRandomInteger(0, links.length - 1)];
};

const generateGenres = () => {
  const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Crime',
    'Drama',
    'Historical',
    'Horror',
    'Musical',
    'Sci-fi',
    'Westerns',
    'War',
  ];

  return shuffle(genres).slice(0, getRandomInteger(1, 3)).join(', ');
};

export const gengerateCard = () => {
  const movieTitle = generateTitle();
  const movieRuntime = `${getRandomInteger(0, 3)}h ${getRandomInteger(0, 59)}m`;
  return {
    title: movieTitle,
    original: movieTitle,
    rating: getRandomFloat(0, 10, 1),
    director: 'Anthony Mann',
    writers: [
      'Anne Wigton',
      'Heinz Herald',
      'Richard Weil',
    ],
    actors: [
      'Erich von Stroheim',
      'Mary Beth Hughes',
      'Dan Duryea',
    ],
    releaseDate: '30 March 1945',
    runtime: movieRuntime,
    country: 'USA',
    genres: generateGenres(),
    poster: generatePosterLink(),
    year: `${getRandomInteger(1910, 2021)}`,
    duration: movieRuntime,
    genre: 'Fantastic',
    description: generateDescription(),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
