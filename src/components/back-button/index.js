import { Component } from 'react';
import { BackHandler } from 'react-native';
import PropTypes from 'prop-types';

/**
* Defines name for hardware back button press event.
*/
const hardwareBackPressEventName = 'hardwareBackPress';

/**
* Listens for back button press events.
*
* Simply add this component to scene's layout
* returned by `render` method and
* don't forget to implement `onPress` handler.
*
* Example:
* ```
* <BackButton
*     onPress={() => {
*         this.props.navigator.pop();
*         return true;
*     }}
* />
* ```
*
* `onPress` method should return boolean value.
* Return `false` if you want to close app when
* user pressed back button.
* Otherwise, return `true`.
*/
export default class BackButton extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    /**
     * Obtain properties.
     */
    const { onPress } = props;

    /**
     * Initialize back button press handler.
     */
    this.handlePress = () => {
      /**
       * By default, we are not going to exit from app.
       */
      let shouldExitFromApp = false;

      /**
       * If `onPress` is not null,
       * use value returned by this method.
       * When `onPress` returns `false`,
       * it means that we should exit from app.
       */
      if (onPress) {
        shouldExitFromApp = !onPress();
      }

      /**
       * Return result value.
       */
      return !shouldExitFromApp;
    };
  }

  componentDidMount() {
    /**
     * Add listener for back button press event.
     */
    BackHandler.addEventListener(
      hardwareBackPressEventName,
      this.handlePress,
    );
  }

  componentWillUnmount() {
    /**
     * Remove listener for back button press event.
     */
    BackHandler.removeEventListener(
      hardwareBackPressEventName,
      this.handlePress,
    );
  }

  render() {
    /**
     * No needs to display anything.
     */
    return null;
  }
}
