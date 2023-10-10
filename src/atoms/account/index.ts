import {atom} from 'jotai';

export type UserType = 'NONE' | 'NEW' | 'EXISTED';

type BaseStatusType = 'DEFAULT' | 'ONPROGRESS';
type StepStatusType<T extends UserType> = {
  userType: T;
  step: number;
};
type PortalStatusType = {isPortalStep: boolean; step: number};

export type AccountFlowStatusType = {
  baseStatus: BaseStatusType;
  stepStatus: StepStatusType<UserType>;
  portalStatus: PortalStatusType;
};

export const accountFlowInitStatus: AccountFlowStatusType = {
  baseStatus: 'DEFAULT',
  stepStatus: {userType: 'NONE', step: 0},
  portalStatus: {isPortalStep: false, step: 0},
};
/** 회원인증 flow status를 관리하는 atom입니다.  */
export const accountFlowStatusAtom = atom<AccountFlowStatusType>(
  accountFlowInitStatus,
);

export type existedAccountInfoType = Array<{
  id: string;
  nickname: string;
  isSelected: boolean;
}>;

export const existedAccountInfoAtom = atom<existedAccountInfoType>([
  {id: '1', nickname: 'hi', isSelected: false},
  {id: '12', nickname: 'hi2', isSelected: false},
  {id: '13', nickname: 'hi3', isSelected: false},
  {id: '14', nickname: 'hi4', isSelected: false},
]);

type accountStatusType = {
  isLogin: boolean;
  phone: string;
};

export const initAccounStatus = {
  isLogin: false,
  phone: '',
};

/** 현재 회원 정보를 관리하는 atom입니다. */
export const accountStatusAtom = atom<accountStatusType>(initAccounStatus);
