import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {PermissionsAndroid, Platform} from 'react-native';

export class NotificationService {
  static async onMessageReceived(
    message: FirebaseMessagingTypes.RemoteMessage,
  ): Promise<string | undefined> {
    if (!message.data) return;
    return notifee.displayNotification(JSON.parse(message.data.notifee));
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
}
