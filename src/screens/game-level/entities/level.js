import Background from '../components/background';
import Card from '../components/card';

const background = require('../../../../assets/images/background.jpg');

export function changeRound(entities) {
  const { card, ratio } = entities.scene;
  const position = {
    x: 100,
    y: 100,
  };
  const hide = true;

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

export default (card, window, ratio) => changeRound({
  background: Background(background),
  scene: {
    ratio,
    card,
  },
});
