import {captureException} from '@sentry/react-native';
import DeviceService from '../../services/device';
import NotificationService from '../../services/notification';
import storage from '../../storage';

/* eslint-disable import/prefer-default-export */
export const handleFCMTokenBackground = async () => {
  await NotificationService.handleFirebasePushToken();

  if (!storage.getBoolean('isLoggedIn')) return;
  // PATCH device info
  try {
    await DeviceService.updateDeviceInfo();
  } catch (error) {
    captureException(error);
  }
};
