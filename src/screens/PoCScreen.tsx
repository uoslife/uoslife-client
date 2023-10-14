import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import notifee from '@notifee/react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useConfigContext} from '../hooks/ConfigContext';
import DeviceInfo from 'react-native-device-info';
import codePush from 'react-native-code-push';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigators/RootStackNavigator';
import {storage} from '../storage';

const PoCScreen: React.FC<StackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
  const {isLoading, config, environment} = useConfigContext();
  const [codePushVersion, setCodePushVersion] =
    useState<string>('NO_CODE_PUSH');

  useEffect(() => {
    (async () => {
      const metadata = await codePush.getUpdateMetadata();
      if (metadata) setCodePushVersion(metadata.label);
    })();
    storage.set('codePushVersion', codePushVersion);
  }, []);

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
            <Text style={styles.bundleInfo}>
              CODE_PUSH_VERSION = {codePushVersion}
            </Text>
            <Text style={styles.appUrl}>
              WEBVIEW_URL = {config.get('webview.url')}
            </Text>
          </>
        )}

        <Button
          title="Push Test"
          onPress={() =>
            notifee.displayNotification({
              title: `시대생 ${environment.toUpperCase()}`,
              body: `${DeviceInfo.getBundleId()}@${codePushVersion}`,
              ios: {sound: 'default'},
              android: {channelId: 'ETC'},
            })
          }
        />
        <Button
          title="Go WebView"
          onPress={() => navigation.push('WebView', {})}
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
    alignItems: 'flex-start',
    padding: 32,
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
