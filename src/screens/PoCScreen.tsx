import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import notifee from '@notifee/react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useConfigContext} from '../hooks/ConfigContext';
import DeviceInfo from 'react-native-device-info';

const PoCScreen: React.FC = () => {
  const {isLoading, config, environment} = useConfigContext();

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <View style={styles.container}>
        <Text style={styles.title}>UOSLIFE PoC</Text>
        <Text style={styles.subtitle}>with React Native</Text>

        {!isLoading && (
          <>
            <Text style={styles.bundleInfo}>
              {DeviceInfo.getBundleId()} ({environment})
            </Text>
            <Text style={styles.appUrl}>WEBVIEW_URL = {config?.APP_URL}</Text>
          </>
        )}

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
  );
};

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
  bundleInfo: {
    color: Colors.light,
    fontSize: 16,
    fontWeight: '400',
  },
  appUrl: {
    color: Colors.light,
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 20,
  },
});

export default PoCScreen;
