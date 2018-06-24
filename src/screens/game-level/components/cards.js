import * as Animatable from 'react-native-animatable';
import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

import { REGULAR_FONT } from '../../../constants/styles';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  text: {
    ...REGULAR_FONT,
    textAlign: 'center',
  },
});

export class Renderer extends PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    naipes: PropTypes.arrayOf(PropTypes.object),
    card: PropTypes.object,
    ratio: PropTypes.number,
  };

  static defaultProps = {
    cards: [],
    naipes: [],
    card: {},
    ratio: 0,
  };

  render() {
    const {
      cards,
      ratio,
      card,
      naipes,
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
            transform={[{ rotate: item.rotate ? '90deg' : '0deg' }]}
            source={item.hide ? card.backImg : card.frontImg}
          />
          {!item.hide &&
            <Animatable.Image
              style={{
                position: 'absolute',
                width: naipes[_.findIndex(naipes, { key: item.card.naipe })].width * ratio,
                height: naipes[_.findIndex(naipes, { key: item.card.naipe })].height * ratio,
                left: (item.position.x + 50) * ratio,
                top: (item.position.y + 147.5) * ratio,
              }}
              source={naipes[_.findIndex(naipes, { key: item.card.naipe })].img}
            />
          }
          {!item.hide &&
            <Text
              style={[
                styles.text,
                {
                  position: 'absolute',
                  left: (item.position.x + 105) * ratio,
                  top: (item.position.y) * ratio,
                  fontSize: 96 * ratio,
                  color: item.card.naipe === 'paus' || item.card.naipe === 'espada' ? '#000' : '#f00',
                },
              ]}
            >
              {item.card.number === 8 &&
                'Q'
              }
              {item.card.number === 9 &&
                'J'
              }
              {item.card.number === 10 &&
                'K'
              }
              {item.card.number === 1 &&
                'A'
              }
              {item.card.number > 1 && item.card.number < 8 &&
                item.card.number
              }
            </Text>
          }
        </Animatable.View>
      ))
    );
  }
}

export default (cards, card, ratio, naipes) => (
  {
    cards,
    card,
    ratio,
    naipes,
    renderer: <Renderer />,
  }
);
