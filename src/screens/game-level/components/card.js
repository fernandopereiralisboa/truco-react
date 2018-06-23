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
    position: PropTypes.object,
    card: PropTypes.object,
    ratio: PropTypes.number,
    hide: PropTypes.bool,
  };

  static defaultProps = {
    position: {},
    card: {},
    ratio: 0,
    hide: false,
  };

  render() {
    const {
      position,
      card,
      ratio,
      hide,
    } = this.props;
    return (
      <Animatable.View
        style={styles.container}
        delay={1000}
        animation="fadeIn"
        useNativeDriver
      >
        <Animatable.Image
          style={{
            width: card.width * ratio,
            height: card.height * ratio,
            left: position.x,
            top: position.y,
          }}
          source={hide ? card.backImg : card.frontImg}
        />
      </Animatable.View>
    );
  }
}

export default (card, position, ratio, hide) => (
  {
    card,
    position,
    ratio,
    hide,
    renderer: <Renderer />,
  }
);
