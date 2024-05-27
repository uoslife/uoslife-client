import {atom} from 'jotai';

const DEFAULT_ACCOUNT_FLOW = 'MAIN';

export type AccountFlowNameType =
  | 'MAIN'
  | 'SMS_AUTHENTICATION'
  | 'SIGN_UP'
  | 'PORTAL_ACCOUNT'
  | 'END';

export type AccountFlowType = AccountFlowNameType;

export const accountFlowInit: AccountFlowType = DEFAULT_ACCOUNT_FLOW;

/** account 인증 flow를 관리하는 atom입니다.  */
export const accountFlowAtom = atom<AccountFlowType>(accountFlowInit);
