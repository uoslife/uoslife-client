import {Alert, Linking} from 'react-native';

import URLS from '../../configs/urls';

const openAppstore = async () => {
  try {
    const supported = await Linking.canOpenURL(URLS.UOSLIFE_INSTALL);
    if (supported) Linking.openURL(URLS.UOSLIFE_INSTALL);
  } catch (err) {
    Alert.alert(err as string);
  }
};

export default openAppstore;
