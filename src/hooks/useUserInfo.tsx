import {useEffect} from 'react';
import {CoreAPI} from '../api/services';
import {accountStatusAtom, initAccounStatus} from '../atoms/account';
import {useSetAtom} from 'jotai';

const useUserInfo = () => {
  const setAccountStatus = useSetAtom(accountStatusAtom);
  useEffect(() => {
    (async () => {
      const getUserRes = await CoreAPI.getUser();
      if (getUserRes.status !== 201) {
        setAccountStatus(initAccounStatus);
        return;
      }
      setAccountStatus(prev => {
        return {...prev, portalVerification: getUserRes.portalVerification};
      });
    })();
  }, []);
};

export default useUserInfo;
