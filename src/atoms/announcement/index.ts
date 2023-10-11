import {atom} from 'jotai';

export const ANNOUNCEMENT_CATEGORY_ID_LIST = [
  'general',
  'academic',
  'recruit',
  'startup',
] as const;

export type AnnouncementCategoryId =
  (typeof ANNOUNCEMENT_CATEGORY_ID_LIST)[number];

type AnnouncementCategoryItem = {
  fullName: string;
  abbreviatedName: string;
};

export const ANNOUNCEMENT_CATEGORY_MAP: {
  [key in AnnouncementCategoryId]: AnnouncementCategoryItem;
} = {
  general: {
    fullName: '일반공지',
    abbreviatedName: '일반',
  },
  academic: {
    fullName: '학사공지',
    abbreviatedName: '학사',
  },
  recruit: {
    fullName: '채용공고',
    abbreviatedName: '채용',
  },
  startup: {
    fullName: '창업공지',
    abbreviatedName: '창업',
  },
} as const;

export type AnnouncementCategoryFullName =
  (typeof ANNOUNCEMENT_CATEGORY_MAP)[AnnouncementCategoryId]['fullName'];

export type AnnouncementCategoryAbbreviatedName =
  (typeof ANNOUNCEMENT_CATEGORY_MAP)[AnnouncementCategoryId]['abbreviatedName'];

export const selectedCategoryIdAtom = atom<AnnouncementCategoryId>('general');
