import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {PermissionsAndroid, Platform} from 'react-native';

import {decode} from 'base-64';

import storage from '../storage';

// TODO: global 변수 다른 module로 옮기기
global.btoa = decode;

export default class NotificationService {
  // notification

  static async onMessageReceived(
    message: FirebaseMessagingTypes.RemoteMessage,
  ): Promise<string | undefined> {
    if (!message.data || !message.data.notifee) return;
    try {
      const notifeeData = btoa(message.data.notifee);
      const notifeePayload = JSON.parse(notifeeData);
      notifee.displayNotification(notifeePayload);
    } catch (e) {
      console.error(e);
    }
  }

  static registerMessageHandler(): void {
    messaging().onMessage(NotificationService.onMessageReceived);
  }
  static registerMessageHandlerOnBackground(): void {
    messaging().setBackgroundMessageHandler(
      NotificationService.onMessageReceived,
    );
  }

  static async requestNotificationPermissions(): Promise<
    FirebaseMessagingTypes.AuthorizationStatus | undefined
  > {
    if (Platform.OS === 'android') {
      if (storage.getBoolean('isNotFirstLoading')) return;
      await Promise.all([
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        ),
        notifee.createChannelGroup({
          id: 'notification',
          name: '알림',
        }),
        notifee.createChannel({
          id: 'ETC',
          name: '알림',
          groupId: 'notification',
        }),
      ]);
    }
    // eslint-disable-next-line consistent-return
    return messaging().requestPermission();
  }

  // tokens

  static async getCurrentPermission(): Promise<FirebaseMessagingTypes.AuthorizationStatus> {
    return messaging().hasPermission();
  }

  static async getNotificationToken(): Promise<string> {
    return messaging().getToken();
  }

  static async getFirebasePushToken(): Promise<string> {
    if (Platform.OS === 'ios' && !storage.getBoolean('isNotFirstLoading')) {
      messaging().setAPNSToken('app');
    }
    const token = await this.getNotificationToken();
    return token;
  }

  static async checkPermissionIsAuthorizedStatus(): Promise<boolean> {
    const permissionStatus = await this.getCurrentPermission();
    if (permissionStatus === messaging.AuthorizationStatus.AUTHORIZED)
      return true;
    return false;
  }

  static setFirebasePushToken(token: string): void {
    storage.set('firebasePushToken', token);
  }

  static async handleFirebasePushToken(): Promise<void> {
    const isPermissionAuthorized =
      await this.checkPermissionIsAuthorizedStatus();
    if (!isPermissionAuthorized) return;

    const token = await this.getFirebasePushToken();
    this.setFirebasePushToken(token);
  }
}
