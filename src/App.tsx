import React, {useEffect} from 'react';
import {
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import notifee from '@notifee/react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const onMessageReceived = async (
    message: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    if (!message.data) return;
    return notifee.displayNotification(JSON.parse(message.data.notifee));
  };

  useEffect(() => {
    (async () => {
      messaging().onMessage(onMessageReceived);
      messaging().setBackgroundMessageHandler(onMessageReceived);

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

      const authStatus = await messaging().requestPermission();
      const fcmToken = await messaging().getToken();

      console.debug(`FCM ${Platform.OS} status = ${authStatus}`);
      console.debug(`FCM ${Platform.OS} token = ${fcmToken}`);
    })();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View style={StyleSheet.absoluteFillObject}>
        <View style={styles.container}>
          <Text style={styles.title}>UOSLIFE PoC</Text>
          <Text style={styles.subtitle}>with React Native</Text>
          <Button
            title="Push Test"
            onPress={() =>
              notifee.displayNotification({
                title: 'UOSLIFE PoC',
                body: 'Push 권한 설정이 확인되었습니다.',
                ios: {sound: 'default'},
                android: {channelId: 'ETC'},
              })
            }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.darker,
  },
  title: {color: Colors.light, fontSize: 32, fontWeight: '700'},
  subtitle: {
    color: Colors.light,
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 20,
  },
});

export default App;
