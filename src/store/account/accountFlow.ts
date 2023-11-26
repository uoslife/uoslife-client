import {atom} from 'jotai';

export type CommonFlowNameType =
  | 'MAIN'
  | 'SIGNIN'
  | 'SIGNUP'
  | 'PORTAL_VERIFICATION'
  | 'FINISH';
export type SignUpUserType = 'NOT_SELECTED' | 'MIGRATION' | 'NEW' | 'DELETED';

export type CommonFlowType = CommonFlowNameType;
export type SignUpFlowType = {signUpUser: SignUpUserType; step: number};

export type AccountFlowType = {
  commonFlow: CommonFlowType;
  signUpFlow: SignUpFlowType;
};

export const accountFlowInit: AccountFlowType = {
  commonFlow: 'MAIN',
  signUpFlow: {signUpUser: 'NOT_SELECTED', step: 0},
};
/** 회원인증 flow를 관리하는 atom입니다.  */
export const accountFlowAtom = atom<AccountFlowType>(accountFlowInit);
