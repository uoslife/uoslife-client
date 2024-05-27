import {useIsFocused} from '@react-navigation/native';
import {useSuspenseQuery} from '@tanstack/react-query';
import QRCode from 'react-native-qrcode-svg';

import {UtilAPI} from '../../../api/services';
import useRefreshOnFocus from '../../../hooks/useRefreshOnFocus';

const DEFAULT_QRCODE_REFETCH_INTERVAL = 10 * 1000;

const StudentIdQrCode = () => {
  const isFocused = useIsFocused();
  const {data, refetch} = useSuspenseQuery({
    queryKey: ['qrCode'],
    queryFn: () => UtilAPI.getStudentId({}),
    refetchInterval: isFocused ? DEFAULT_QRCODE_REFETCH_INTERVAL : false,
    select: qrCode => qrCode.data,
  });

  useRefreshOnFocus(refetch);
  return <QRCode value={data} size={140} logoBackgroundColor="transparent" />;
};

export default StudentIdQrCode;
