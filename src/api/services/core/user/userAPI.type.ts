export type checkDuplicateUserNicknameParams = {
  nickname: string;
};
export type checkDuplicateUserNicknameRes = {
  duplicated: boolean;
};

export type getExistedAccountInfoParams = {
  mobile: string;
};
export type getExistedAccountInfoRes = Array<{
  id: string;
  nickname: string;
  username: string;
}>;
