type AuthAPIDefaultResType = {
  statusCode: number;
  message: string;
};

export type SignUpParams = {
  /** ex) phone: "01012345678" */
  phone: string;
  /** ex) nickname: "uoslife" */
  nickname: string;
  personalData: boolean;
  uoslifeUsing: boolean;
  adsAndMarketing: boolean;
};

export type SignUpRes = AuthAPIDefaultResType;

export type GetRefreshTokenRes = {
  accessToken: string;
  refreshToken: string;
} & AuthAPIDefaultResType;

export type LogoutRes = {
  userId?: string;
} & AuthAPIDefaultResType;

export type LoginParams = {
  phone: string;
};
export type LoginRes = {
  accessToken: string;
  refreshToken: string;
} & AuthAPIDefaultResType;
