import {atom, useSetAtom} from 'jotai';

type userStatusType = {
  isLoggedIn: boolean;
};

export const initUserStatus = {
  isLoggedIn: false,
};

/** 현재 회원 정보를 관리하는 atom입니다.*/
export const userStatusAtom = atom<userStatusType>(initUserStatus);

export const useUserStatus = () => {
  const setUserStatus = useSetAtom(userStatusAtom);

  const setIsLoggedIn = (isLoggedIn: userStatusType['isLoggedIn']) => {
    setUserStatus(prev => {
      return {...prev, isLoggedIn};
    });
  };

  return {setIsLoggedIn};
};
