import {atom} from 'jotai';
import {MigrationUserInfoType} from '../../api/services/core/auth/authAPI.type';

export type ExistedAccountInfoType = Array<
  MigrationUserInfoType & {
    isSelected?: boolean;
  }
>;

export const existedAccountInfoAtom = atom<ExistedAccountInfoType>([]);
