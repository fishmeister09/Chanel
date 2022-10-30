import React from 'react';
import {StyleSheet, Dimensions, Alert, View, Text} from 'react-native';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
const MIN_HEIGHT = 128;
export const MAX_HEIGHT = height / 2;
const styles = StyleSheet.create({
  container: {
    width,
    height: MIN_HEIGHT,
    justifyContent: 'flex-end',
  },
  picture: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), {
    width: undefined,
    height: undefined,
  }),
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  titleContainer: {
    maxHeight: MAX_HEIGHT * 0.61,
    justifyContent: 'center',
    flexGrow: 1,
  },
  mainTitle: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), {
    justifyContent: 'center',
    padding: 35,
    marginTop: '-7%',
    transform: [{translateY: 64}],
  }),
  subtitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,

    fontFamily: 'SF-Pro-Display-Bold',
  },
});
const Item = ({y, index, item: {title, subtitle, picture, top}}) => {
  const style = useAnimatedStyle(() => {
    return {
      height: interpolate(
        y.value,
        [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
        [MIN_HEIGHT, MAX_HEIGHT],
        Extrapolate.CLAMP,
      ),
    };
  });
  const titleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
    };
  });
  const pictureStyle = useAnimatedStyle(() => ({
    height: MAX_HEIGHT,
    top: interpolate(
      y.value,
      [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
      [-top, 0],
    ),
  }));
  return React.createElement(
    Animated.View,
    {style: [styles.container, style]},
    React.createElement(Animated.Image, {
      source: picture,
      style: [styles.picture, pictureStyle],
    }),
    React.createElement(
      View,
      {style: styles.titleContainer},
      React.createElement(
        Text,
        {style: styles.subtitle},
        subtitle.toUpperCase(),
      ),
      React.createElement(
        View,
        {style: styles.mainTitle},
        React.createElement(
          Animated.View,
          {style: titleStyle},
          React.createElement(Text, {style: styles.title}, title.toUpperCase()),
        ),
      ),
    ),
  );
};
export default Item;
