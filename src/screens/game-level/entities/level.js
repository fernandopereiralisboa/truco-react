import Background from '../components/background';
import Card from '../components/card';

import generateRounds from './round';

const background = require('../../../../assets/images/background.jpg');

export function changeRound(entities, index) {
  const { card, ratio, rounds } = entities.scene;
  const round = rounds[index];
  const position = {
    x: 100,
    y: 100,
  };
  const hide = true;

  console.log('ROUNDS', rounds);

  return {
    ...entities,
    background: {
      ...entities.background,
    },
    scene: {
      ...entities.scene,
    },
    card: Card(
      card,
      position,
      ratio,
      hide,
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
