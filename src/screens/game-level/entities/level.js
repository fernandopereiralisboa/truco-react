import Background from '../components/background';

const background = require('../../../../assets/images/background.jpg');

export function changeRound(entities) {
  return {
    ...entities,
    background: {
      ...entities.background,
    },
  };
}

export default (window, ratio) => changeRound({ background: Background(background) });
