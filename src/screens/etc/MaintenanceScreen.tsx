import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAtom} from 'jotai';
import supabaseConfigAtom from '../../store/app/supabaseConfig';

type Props = {hasNetworkError?: boolean};

const MaintenanceScreen: React.FC<Props> = ({hasNetworkError}) => {
  const [{data}] = useAtom(supabaseConfigAtom);

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <View style={styles.container}>
        {hasNetworkError ? (
          <>
            <Text style={styles.title}>서비스에 접속할 수 없습니다.</Text>
            <Text style={styles.subtitle}>
              일시적인 네트워크 오류로 서비스에 접속할 수 없습니다.{'\n'}
              잠시 후 다시 시도해주세요.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>
              {data?.config?.get('app.block.title') as string}
            </Text>
            <Text style={styles.subtitle}>
              {typeof data?.config?.get('app.block.message') === 'object'
                ? (data?.config?.get('app.block.message') as string[]).join(
                    '\n',
                  )
                : (data?.config?.get('app.block.message') as string)}
            </Text>
          </>
        )}
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
    padding: 32,
    gap: 8,
    backgroundColor: Colors.darker,
  },
  title: {color: Colors.light, fontSize: 24, fontWeight: '700'},
  subtitle: {
    color: Colors.light,
    fontSize: 16,
    lineHeight: 28,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default MaintenanceScreen;
