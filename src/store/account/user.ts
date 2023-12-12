import atomWithMMKV from '../../storage/atomWithMMKV';

import {UserInfoType} from '../../api/services/core/user/userAPI.type';

export type UserAtomType = {user: UserInfoType | null};

export const initTokenAtomValue = {user: null};
export const userAtom = atomWithMMKV<UserAtomType>('user', initTokenAtomValue);
