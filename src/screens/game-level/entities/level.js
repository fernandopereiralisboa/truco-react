import Background from '../components/background';
import Cards from '../components/cards';

import generateRounds from './round';

const background = require('../../../../assets/images/background.jpg');

export function changeRound(entities, index) {
  const { ratio, rounds, card } = entities.scene;
  const round = rounds[index];
  const { cards } = round;

  return {
    ...entities,
    background: {
      ...entities.background,
    },
    scene: {
      ...entities.scene,
    },
    cards: Cards(
      cards,
      card,
      ratio,
    ),
  };
}

export default (pack, card, window, ratio) => {
  const rounds = generateRounds(pack, window, ratio);
  return changeRound({
    background: Background(background),
    scene: {
      rounds,
      ratio,
      card,
    },
  }, 0);
};
