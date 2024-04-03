export type AnnouncementOriginNameType = 'FA1' | 'FA2' | 'FA34' | 'FA35';
export type AnnouncementOriginNameEnumType = Record<
  AnnouncementOriginNameType,
  string
>;

export const DEFAULT_ANNOUNCEMENT_ORIGIN = 'FA1' as const;
export const DEFAULT_GET_ANNOOUNCEMENT_SIZE = 10;

export const AnnouncementOrigins = [
  'FA1',
  'FA2',
  'FA34',
  'FA35',
] satisfies AnnouncementOriginNameType[];

export const AnnouncementOriginEnum: AnnouncementOriginNameEnumType = {
  FA1: '일반',
  FA2: '학사',
  FA34: '채용',
  FA35: '창업',
};

export const AnnouncementFullNameEnum: AnnouncementOriginNameEnumType = {
  FA1: '일반공지',
  FA2: '학사공지',
  FA34: '직원채용',
  FA35: '창업공지',
};
