import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {storage} from '../storage';

export class NotificationService {
  static async onMessageReceived(
    message: FirebaseMessagingTypes.RemoteMessage,
  ): Promise<string | undefined> {
    if (!message.data || !message.data.notifee) return;
    try {
      const notifeeData = btoa(message.data.notifee);
      const notifeePayload = JSON.parse(notifeeData);
      return notifee.displayNotification(notifeePayload);
    } catch (e) {
      console.error(e);
    }
  }

  static registerMessageHandler(): void {
    const fcm = messaging();
    fcm.onMessage(NotificationService.onMessageReceived);
    fcm.setBackgroundMessageHandler(NotificationService.onMessageReceived);
  }

  static async requestNotificationPermissions(): Promise<FirebaseMessagingTypes.AuthorizationStatus> {
    if (Platform.OS === 'android') {
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

    return messaging().requestPermission();
  }

  static async getNotificationToken(): Promise<string> {
    return messaging().getToken();
  }

  static async getFirebasePushToken(): Promise<string> {
    if (Platform.OS === 'ios') messaging().setAPNSToken('app');
    const token = await this.getNotificationToken();
    return token;
  }
  static async setFirebasePushToken(): Promise<void> {
    const token = await this.getFirebasePushToken();
    storage.set('firebasePushToken', token ?? '');
  }
}
