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
  const hands = [
    {
      cards: {
        1: pack[0],
        2: pack[4],
        3: pack[8],
      },
    },
    {
      cards: {
        1: pack[1],
        2: pack[5],
        3: pack[9],
      },
    },
    {
      cards: {
        1: pack[2],
        2: pack[6],
        3: pack[10],
      },
    },
    {
      cards: {
        1: pack[3],
        2: pack[7],
        3: pack[11],
      },
    },
  ];

  let count = 0;
  while (count < 4) {
    const swap = _.floor(_.random(0, 1, true));
    let temporaryValue = {};
    let randomIndex = 0;

    if (swap) {
      randomIndex = _.floor(_.random(0, 3, true));
      temporaryValue = hands[count];
      hands[count] = hands[randomIndex];
      hands[randomIndex] = temporaryValue;
    }

    count += 1;
  }

  return hands;
};

const setManilhas = (shuffledPack) => {
  const shuffledPackWithManilhas = [];
  const vira = shuffledPack[_.floor(_.random(12, _.size(shuffledPack) - 1))];
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

export function generateRound(pack, window, ratio) {
  const shuffledPack = shuffle(pack);
  const shuffledPackWithManilhas = setManilhas(shuffledPack);
  const hands = distributeCards(shuffledPackWithManilhas);
  return {
    hands,
    window,
    ratio,
  };
}

export default (pack, window, ratio) =>
  _.times(MAX_ROUNDS, () => generateRound(pack, window, ratio));
