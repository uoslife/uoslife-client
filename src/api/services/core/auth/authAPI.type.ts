type AuthTokenDefaultRes = {
  accessToken: string;
  refreshToken: string;
};
export type MigrationUserInfoType = {
  id: string;
  nickname: string;
  username: string;
};

export type SendSMSVerificationCodeParams = {
  mobile: string;
};
export type SendSMSVerificationCodeRes = {
  mobile: string;
};

export type UnregisterParams = null;
export type UnregisterRes = {
  id: number;
  name: string;
  nickname: string;
  birthday: string;
  phone: string;
  avatarUrl: string;
  loginAt: string;
};

export type SignUpParams = {
  nickname: string;
  tos: {
    privatePolicy: boolean;
    termsOfUse: boolean;
    notification: boolean;
    marketing: boolean;
  };
  migrationUserInfo: MigrationUserInfoType | null;
};
export type SignUpRes = AuthTokenDefaultRes;

export type SignInParams = {
  mobile: string;
  code: string;
};
export type SignInRes = {
  token: AuthTokenDefaultRes;
  migrationUserInfo: Array<MigrationUserInfoType>;
  migrationNeeded: boolean;
  isTokenEmpty: boolean;
};

export type GetRefreshTokenRes = AuthTokenDefaultRes;

export type LogoutRes = {};
