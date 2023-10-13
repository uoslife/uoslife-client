import {atom} from 'jotai';
import {MigrationUserInfoType} from '../../api/services/core/auth/authAPI.type';

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

export type existedAccountInfoType = Array<
  MigrationUserInfoType & {
    isSelected: boolean;
  }
>;

export const existedAccountInfoAtom = atom<existedAccountInfoType>([]);

type accountStatusType = {
  isLogin: boolean;
  phone: string;
};

export const initAccounStatus = {
  isLogin: false,
  phone: '',
};

/** 현재 회원 정보를 관리하는 atom입니다. TODO: 추후 삭제 */
export const accountStatusAtom = atom<accountStatusType>(initAccounStatus);
