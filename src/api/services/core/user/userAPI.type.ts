export type UserInfoType = {
  id: number;
  name: string;
  nickname: string;
  birthday: string;
  phone: string;
  avatarUrl: string;
  isVerified: boolean;
  degree: string;
  enrollmentStatus: string;
  studentId: string;
  departmentName: string;
  collegeName: string;
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
