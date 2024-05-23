// auth
export type JWTTokenType = {
  accessToken: string;
  refreshToken?: string;
};
export type AuthTokenDefaultRes = JWTTokenType & {
  reason:
    | 'logged_in' // 로그인 완료
    | 'registering' // 회원가입 필요
    | 'registered' // 회원가입 완료
    | 'refreshed'; // 토큰 재발급 완료
};

export type UserInfoType = {
  id: number;
  nickname: string;
  name: string;
  email: string;
  identity: {
    id: string;
    type: string;
    status: string;
    idNumber: string;
    university: string;
    department: string;
    major: string;
  };
  moderator: {
    generation: string;
    chapter: string;
    role: string;
  };
  isLinkedPortal: boolean;
  isVerified: boolean;
  verificationMethod: string;
};

export type NicknameJsonType = {
  nickname: string;
};

// verification
export type PortalAccountDtoType = {
  username: string;
  isActive: boolean;
  linkedAt: string;
};

// device
export type DeviceInfoType = {
  firebasePushToken: string;
  model: string;
  os: string;
  osVersion: string;
  appVersion: string;
  codePushVersion: string;
};

export type DeviceInfoResType = DeviceInfoType & {
  id: number;
  createdAt: string;
  lastUsedAt: string;
};
