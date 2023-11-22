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

export type ExistedAccountInfoType = MigrationUserInfoType & {
  isSelected?: boolean;
};

export type ExistedAccountInfoArrayType = Array<ExistedAccountInfoType>;

export const existedAccountInfoAtom = atom<ExistedAccountInfoArrayType>([]);
