export type AuthTokenDefaultRes = {
  accessToken: string;
  refreshToken: string;
  reason: 'logged_in';
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

export type PortalAccountDtoType = {
  username: string;
  isActive: boolean;
  linkedAt: string;
};
