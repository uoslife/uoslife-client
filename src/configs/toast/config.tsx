/* eslint-disable react-native/no-inline-styles */

import {colors} from '@uoslife/design-system';
import {BaseToast, ToastConfigParams} from 'react-native-toast-message';

const toastConfig = {
  success: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors.primaryBrand}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
};

export default toastConfig;
