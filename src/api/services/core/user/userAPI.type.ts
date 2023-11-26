export type UserInfoType = {
  id: number;
  name: string;
  nickname: string;
  birthday: string;
  phone: string;
  avatarUrl: string;
  loginAt: string;
  nicknameUpdatedAt: null;
  identities: Array<
    | {
        degree: string;
        graduateSchool: string;
        studentId: string;
        department: string;
        status: string;
      }
    | undefined
  >;
  isVerified: boolean;
  organizations: [];
};

export type CheckDuplicateUserNicknameParams = {
  nickname: string;
};
export type CheckDuplicateUserNicknameRes = {
  duplicate: boolean;
};

export type GetUserInfoParams = {};
export type GetUserInfoRes = UserInfoType;

export type ChangePhoneParams = {mobile: string; code: string};
export type ChangePhoneRes = UserInfoType;

export type ChangeNicknameParams = {nickname: string};
export type ChangeNicknameRes = UserInfoType;
