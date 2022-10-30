import React from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Item, {MAX_HEIGHT} from './Item';
import {items} from './Model';
const styles = StyleSheet.create({
  container: {
    height: (items.length + 1) * MAX_HEIGHT,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
  },
});
const Channel = () => {
  const y = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y: value}}) => {
      y.value = value;
    },
  });
  return React.createElement(
    React.Fragment,
    null,

    React.createElement(
      Animated.ScrollView,

      {
        onScroll: onScroll,
        showsVerticalScrollIndicator: false,
        scrollEventThrottle: 16,
        snapToInterval: MAX_HEIGHT,
      },
      React.createElement(
        Animated.View,
        {style: styles.container},
        items.map((item, index) =>
          React.createElement(
            TouchableOpacity,
            {
              onPress: () => console.log(item),
              key: index,
              activeOpacity: 1,
            },
            React.createElement(Item, {
              item: item,
              key: index,
              y: y,
              index: index,
            }),
          ),
        ),
      ),
    ),
  );
};
export default Channel;
