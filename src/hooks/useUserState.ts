import {useAtom} from 'jotai';
import {UserInfoType} from '../api/services/account/type';
import {userAtom} from '../store/user/user';

export type SetUserInfoType = (userInfo: UserInfoType) => void;
export type DeleteUserInfoType = () => void;

const useUserState = () => {
  const [{user}, setUser] = useAtom(userAtom);
  const setUserInfo: SetUserInfoType = (userInfo: UserInfoType) => {
    setUser({user: userInfo});
  };

  const deleteUserInfo: DeleteUserInfoType = () => {
    setUser({user: null});
  };

  return {
    user,
    setUserInfo,
    deleteUserInfo,
  };
};

export default useUserState;
