import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { GameEngine } from 'react-native-game-engine';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import BackButton from '../../components/back-button';

import Level from './entities/level';
// import Systems from './systems';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  openOptions: {
    position: 'absolute',
  },
});

const ORIGINAL_WIDTH = 750;

class GameLevelScreen extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      ratio: 0,
      window: {},
    };
  }

  componentWillMount() {
    const window = Dimensions.get('window');
    const ratio = window.width / ORIGINAL_WIDTH;

    this.setState({
      ratio,
      window,
    });
  }

  onBackPress = () => {
    this.props.navigation.pop(2);
    return true;
  }

  render() {
    const {
      ratio,
      window,
    } = this.state;

    return (
      <View style={styles.container}>
        <BackButton onPress={this.onBackPress} />
        <GameEngine
          entities={Level(window, ratio)}
        />
      </View>
    );
  }
}

export default connect(null, null)(GameLevelScreen);
