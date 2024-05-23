import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, {EventType, Event} from '@notifee/react-native';
import {Linking, PermissionsAndroid, Platform} from 'react-native';

import {captureException} from '@sentry/react-native';
import storage from '../storage';
import decodeUtf8 from '../utils/decodeUtf8';

export default class NotificationService {
  // notification

  static async onMessageReceived(
    message: FirebaseMessagingTypes.RemoteMessage,
  ): Promise<string | undefined> {
    if (!message.data || !message.data.notifee) return;
    try {
      const notifeeData = decodeUtf8(message.data.notifee);
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

  /** OS에서 알림 권한을 가져옵니다. */
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
      ]);
      await notifee.createChannel({
        id: 'ETC',
        name: '알림',
        groupId: 'notification',
      });
    }
    // eslint-disable-next-line consistent-return
    return messaging().requestPermission();
  }

  static async onPressEvent({type, detail}: Event): Promise<void> {
    if (type !== EventType.PRESS) return;
    const {notification} = detail;
    if (!notification || !notification.data || !notification.data.deepLinkUrl)
      return;
    await Linking.openURL(notification.data.deepLinkUrl as string);
  }

  static onForegroundEvent(): () => void {
    return notifee.onForegroundEvent(
      async event => await this.onPressEvent(event),
    );
  }

  static onBackgroundEvent() {
    // background event
  }

  // tokens

  static async getCurrentPermission(): Promise<FirebaseMessagingTypes.AuthorizationStatus> {
    return messaging().hasPermission();
  }

  static async getNotificationToken(): Promise<string> {
    return messaging().getToken();
  }

  static async getFirebasePushToken(): Promise<string> {
    if (Platform.OS === 'ios') {
      messaging().setAPNSToken('app');
    }
    const token = await this.getNotificationToken();
    return token;
  }

  static async checkPermissionIsAuthorizedStatus(): Promise<boolean> {
    const permissionStatus = await this.getCurrentPermission();
    return permissionStatus === messaging.AuthorizationStatus.AUTHORIZED;
  }

  static setFirebasePushToken(token: string): void {
    storage.set('firebasePushToken', token);
  }

  /** 알림 수신 동의한 유저에 한해 fcm token을 가져오고, 저장합니다. */
  static async handleFirebasePushToken(): Promise<void> {
    const isPermissionAuthorized =
      await this.checkPermissionIsAuthorizedStatus();
    if (!isPermissionAuthorized) return;
    try {
      const token = await this.getFirebasePushToken();
      this.setFirebasePushToken(token);
    } catch (error) {
      captureException(error);
    }
  }
}
