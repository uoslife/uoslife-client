import {DefaultTheme} from '@react-navigation/native';
import {colors} from '@uoslife/design-system';

const customBackgroundTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

export default customBackgroundTheme;
