import {StyleSheet, Platform} from 'react-native';

const boxShadowStyle = StyleSheet.create({
  bottomTapShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  LibraryShadow: {
    shadowOpacity: 0.8,
    shadowColor: 'rgba(70, 134, 255, 0.20)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
export default boxShadowStyle;
