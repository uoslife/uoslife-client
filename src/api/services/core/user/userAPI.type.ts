export type CheckDuplicateUserNicknameParams = {
  nickname: string;
};
export type CheckDuplicateUserNicknameRes = {
  duplicated: boolean;
};

export type GetExistedAccountInfoParams = {
  mobile: string;
};
export type GetExistedAccountInfoRes = Array<{
  id: string;
  nickname: string;
  username: string;
}>;
