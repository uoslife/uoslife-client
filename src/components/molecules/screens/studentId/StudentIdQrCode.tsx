import React, {useEffect, useState} from 'react';
import {useSuspenseQuery} from '@tanstack/react-query';
import {AppState} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {UtilAPI} from '../../../../api/services';

const StudentIdQrCode = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [refetchInterval, setRefetchInterval] = useState<number | false>(
    1000 * 10,
  );

  const {data, refetch} = useSuspenseQuery({
    queryKey: ['qrCode'],
    queryFn: () => UtilAPI.getStudentId({}),
    refetchInterval,
    select: qrCode => qrCode.data,
  });

  const handleAppStateChange = async () => {
    if (isFocused) {
      await refetch();
      setRefetchInterval(1000 * 10);
      return;
    }
    setRefetchInterval(false);
  };

  useEffect(() => {
    // 여러 navigation(메인, 숨은학점 등 스크린) 전환 시,
    const blurListener = navigation.addListener('blur', () =>
      handleAppStateChange(),
    );
    // background에서 foreground로 전환 시,
    const appStateListener = AppState.addEventListener('change', () =>
      handleAppStateChange(),
    );
    return () => {
      navigation.removeListener('blur', blurListener);
      appStateListener.remove();
    };
  }, [isFocused, AppState.currentState]);

  return <QRCode value={data} size={140} logoBackgroundColor="transparent" />;
};

export default StudentIdQrCode;
