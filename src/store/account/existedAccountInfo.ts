import {atom} from 'jotai';
import {MigrationUserInfoType} from '../../api/services/core/auth/authAPI.type';

export type ExistedAccountInfoArrayType = Array<ExistedAccountInfoType>;

export type ExistedAccountInfoType = MigrationUserInfoType & {
  isSelected?: boolean | undefined;
};

export const existedAccountInfoAtom = atom<ExistedAccountInfoArrayType>([]);
