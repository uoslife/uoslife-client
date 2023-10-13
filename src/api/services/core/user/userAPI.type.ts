export type CheckDuplicateUserNicknameParams = {
  nickname: string;
};
export type CheckDuplicateUserNicknameRes = {
  duplicate: boolean;
};

export type GetUserInfoParams = {};
export type GetUserInfoRes = {
  id: number;
  name: string;
  nickname: string;
  birthday: string;
  phone: string;
  avatarUrl: string;
  loginAt: string;
};
