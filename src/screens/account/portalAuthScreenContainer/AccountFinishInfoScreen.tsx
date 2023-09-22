import {Txt} from '@uoslife/design-system';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {CoreAPI} from '../../../api/services';
import {useAtom, useAtomValue} from 'jotai';
import {accountStatusAtom} from '../../../atoms/account';
import storeToken from '../../../utils/storeToken';
import showErrorMessage from '../../../utils/showErrorMessage';

const REDIRECT_TO_MAIN_TIME = 3 * 1000;

// const useAutoRedirect = (time: number) => {
//   useEffect(() => {
//     const interval = setInterval(() => {}, time);
//     return clearInterval(interval);
//   });
// };

const AccountFinishInfoScreen = () => {
  const [accountStatus, setAccontStatus] = useAtom(accountStatusAtom);
  useEffect(() => {
    (async () => {
      try {
        const res = await CoreAPI.login({phone: accountStatus.phone});
        storeToken(res.accessToken, res.refreshToken);
        setAccontStatus(prev => {
          return {...prev, accountStatus: true};
        });
      } catch (error) {
        showErrorMessage(error);
      }
    })();
  }, []);
  // useAutoRedirect(REDIRECT_TO_MAIN_TIME);
  return (
    <View>
      <Txt label={'로그인 완료!'} color={'grey40'} typograph={'bodySmall'} />
    </View>
  );
};

export default AccountFinishInfoScreen;
