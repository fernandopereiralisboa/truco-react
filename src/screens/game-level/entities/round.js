import _ from 'lodash';

import { MAX_ROUNDS } from '../config';

const shuffle = (pack) => {
  const shuffledPack = _.clone(pack);
  let currentIndex = _.size(shuffledPack);
  let randomIndex = 0;
  let temporaryValue = {};

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = _.floor(_.random(0, _.size(shuffledPack) - 1, true));
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = shuffledPack[currentIndex];
    shuffledPack[currentIndex] = shuffledPack[randomIndex];
    shuffledPack[randomIndex] = temporaryValue;
  }

  return shuffledPack;
};

const distributeCards = (pack) => {
  const cards = [
    {
      card: pack[0],
      position: {
        x: 366,
        y: (1088),
      },
      hide: false,
    },
    {
      card: pack[4],
      position: {
        x: 188,
        y: (1088),
      },
      hide: false,
    },
    {
      card: pack[8],
      position: {
        x: 10,
        y: (1088),
      },
      hide: false,
    },
    {
      card: pack[1],
      position: {
        x: 450,
        y: (1029),
      },
      hide: false,
    },
    {
      card: pack[5],
      position: {
        x: 230,
        y: (1029),
      },
      hide: false,
    },
    {
      card: pack[9],
      position: {
        x: 10,
        y: (1029),
      },
      hide: false,
    },
    {
      card: pack[2],
      position: {
        x: 450,
        y: (1029),
      },
      hide: false,
    },
    {
      card: pack[6],
      position: {
        x: 230,
        y: (1029),
      },
      hide: false,
    },
    {
      card: pack[10],
      position: {
        x: 10,
        y: (1029),
      },
      hide: false,
    },
    {
      card: pack[3],
      position: {
        x: 450,
        y: (1029),
      },
      hide: false,
    },
    {
      card: pack[7],
      position: {
        x: 230,
        y: (1029),
      },
      hide: false,
    },
    {
      card: pack[11],
      position: {
        x: 10,
        y: (1029),
      },
      hide: false,
    },
  ];

  return cards;
};

const setManilhas = (shuffledPack, vira) => {
  const shuffledPackWithManilhas = [];
  const numberManilha = vira.number === 10 ? 1 : vira.number + 1;
  let card = {};

  let count = 0;

  while (count < 12) {
    let { weight } = shuffledPack[count];
    if (shuffledPack[count].number === numberManilha) {
      if (shuffledPack[count].naipe === 'ouro') {
        weight = 100;
      } else if (shuffledPack[count].naipe === 'espada') {
        weight = 200;
      } else if (shuffledPack[count].naipe === 'copas') {
        weight = 300;
      } else if (shuffledPack[count].naipe === 'paus') {
        weight = 400;
      }
    }

    card = {
      number: shuffledPack[count].number,
      naipe: shuffledPack[count].naipe,
      weight,
    };

    shuffledPackWithManilhas.push(card);

    count += 1;
  }

  return shuffledPackWithManilhas;
};

const getVira = (shuffledPack) => {
  const vira = {
    card: shuffledPack[_.floor(_.random(12, _.size(shuffledPack) - 1))],
    position: {
      x: 375,
      y: 598,
    },
    hide: false,
  };

  return vira;
};

export function generateRound(pack, window, ratio) {
  const shuffledPack = shuffle(pack);
  const vira = getVira(shuffledPack);
  const shuffledPackWithManilhas = setManilhas(shuffledPack, vira.card);
  const cards = distributeCards(shuffledPackWithManilhas, window, ratio);

  cards.push(vira);

  return {
    cards,
    window,
    ratio,
  };
}

export default (pack, window, ratio) =>
  _.times(MAX_ROUNDS, () => generateRound(pack, window, ratio));
