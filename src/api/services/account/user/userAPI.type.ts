import {AuthTokenDefaultRes, NicknameJsonType, UserInfoType} from '../type';

export type SignUpParams = NicknameJsonType;
export type SignUpRes = AuthTokenDefaultRes;

export type GetUserInfoRes = UserInfoType;

export type PatchUserInfoParams = NicknameJsonType;
export type PatchUserInfoRes = UserInfoType;

export type UnregisterRes = boolean;
