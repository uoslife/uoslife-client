import {Alert} from 'react-native';
import {UPDATE_GUIDE} from '../../configs/app/update_guide';
import {AppEnvironment} from '../../store/app/supabaseConfig';
import openAppstore from './openAppstore';

export const guideUpdate = (environment: AppEnvironment | undefined) => {
  if (environment === 'alpha') {
    Alert.alert(UPDATE_GUIDE.ALPHA_TITLE, UPDATE_GUIDE.ALPHA_MESSAGE);
    return;
  }
  Alert.alert(UPDATE_GUIDE.PROD_TITLE, UPDATE_GUIDE.PROD_MESSAGE, [
    {
      text: '이동하기',
      onPress: openAppstore,
    },
  ]);
};
