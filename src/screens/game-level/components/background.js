import React, { PureComponent } from 'react';
import { Dimensions, Image } from 'react-native';

export class Renderer extends PureComponent {
  static propTypes = {
    image: Image.propTypes.source.isRequired,
  };

  render() {
    const { image } = this.props;
    const window = Dimensions.get('window');

    return [
      <Image
        style={{
          position: 'absolute',
          width: window.width,
          height: window.height,
        }}
        source={image}
        resizeMode="stretch"
      />,
    ];
  }
}

export default image => (
  {
    image,
    renderer: <Renderer />,
  }
);
