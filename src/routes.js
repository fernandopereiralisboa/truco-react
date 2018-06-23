import { StackNavigator } from 'react-navigation';
import { Animated, Easing } from 'react-native';

import GameLevelScreen from './screens/game-level';

const transitionConfig = () => ({
  transitionSpec: {
    duration: 750,
    easing: Easing.in(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: (sceneProps) => {
    const { position, scene } = sceneProps;

    const thisSceneIndex = scene.index;

    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [0, 1],
    });

    return { opacity };
  },
});

const Startup = StackNavigator(
  {
    GameLevel: GameLevelScreen,
  },
  {
    initialRouteName: 'GameLevel',
    headerMode: 'none',
    mode: 'card',
    cardStyle: {
      backgroundColor: 'transparent',
    },
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig,
  },
);

export default Startup;

