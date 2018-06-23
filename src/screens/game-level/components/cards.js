import * as Animatable from 'react-native-animatable';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export class Renderer extends PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    card: PropTypes.object,
    ratio: PropTypes.number,
  };

  static defaultProps = {
    cards: [],
    card: {},
    ratio: 0,
  };

  render() {
    const {
      cards,
      ratio,
      card,
    } = this.props;

    return (
      cards.map(item => (
        <Animatable.View
          style={styles.container}
          delay={100}
          animation="fadeIn"
          useNativeDriver
        >
          <Animatable.Image
            style={{
              width: card.width * ratio,
              height: card.height * ratio,
              left: item.position.x * ratio,
              top: item.position.y * ratio,
            }}
            source={card.backImg}
          />
        </Animatable.View>
      ))
    );
  }
}

export default (cards, card, ratio) => (
  {
    cards,
    card,
    ratio,
    renderer: <Renderer />,
  }
);
