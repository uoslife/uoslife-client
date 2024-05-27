export type ChallengeUserStatusType =
  | 'EGG'
  | 'BABY'
  | 'CHICK'
  | 'JUNGDO'
  | 'CHEONJAE'
  | 'MANJAE';
export type ChallengeUserStatusEnumType = Record<
  ChallengeUserStatusType,
  string
>;

export type ChallengeUserStatusDesEnumType = Record<
  ChallengeUserStatusType,
  string
>;

export const ChallengeUserStatusEnum: ChallengeUserStatusEnumType = {
  EGG: '알',
  BABY: '아기루매',
  CHICK: '병아리루매',
  JUNGDO: '중도루매',
  CHEONJAE: '천재루매',
  MANJAE: '만재루매',
};

export const ChallengeUserStatusDesEnum: ChallengeUserStatusDesEnumType = {
  EGG: '공부 루매를 깨워봐요!',
  BABY: '루매가 부화했어요!',
  CHICK: '삐약삐약',
  JUNGDO: '공부좀 했는 걸~',
  CHEONJAE: '중도에 살고 계시군요?',
  MANJAE: 'A+는 따놓은 당상!!',
};
