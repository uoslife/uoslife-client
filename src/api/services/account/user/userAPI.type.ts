import {AuthTokenDefaultRes, NicknameJsonType, UserInfoType} from '../type';

export type SignInParams = NicknameJsonType;
export type SignInRes = AuthTokenDefaultRes;

export type GetUserInfoParams = undefined;
export type GetUserInfoRes = UserInfoType;

export type PatchUserInfoParams = NicknameJsonType;
export type PatchUserInfoRes = UserInfoType;

export type UnregisterParams = undefined;
export type UnregisterRes = boolean;
