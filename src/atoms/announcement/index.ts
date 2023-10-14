import {atom} from 'jotai';

export const ANNOUNCEMENT_CATEGORY_ORIGIN_LIST = [
  'FA1',
  'FA2',
  'FA34',
  'FA35',
] as const;

export type AnnouncementCategoryOrigin =
  (typeof ANNOUNCEMENT_CATEGORY_ORIGIN_LIST)[number];

type AnnouncementCategoryItem = {
  fullName: string;
  abbreviatedName: string;
};

export const ANNOUNCEMENT_CATEGORY_ORIGIN_TO_NAME_VIEW_MAP: {
  [key in AnnouncementCategoryOrigin]: AnnouncementCategoryItem;
} = {
  FA1: {
    fullName: '일반공지',
    abbreviatedName: '일반',
  },
  FA2: {
    fullName: '학사공지',
    abbreviatedName: '학사',
  },
  FA34: {
    fullName: '채용공고',
    abbreviatedName: '채용',
  },
  FA35: {
    fullName: '창업공지',
    abbreviatedName: '창업',
  },
} as const;

export type AnnouncementCategoryFullName =
  (typeof ANNOUNCEMENT_CATEGORY_ORIGIN_TO_NAME_VIEW_MAP)[AnnouncementCategoryOrigin]['fullName'];

export type AnnouncementCategoryAbbreviatedName =
  (typeof ANNOUNCEMENT_CATEGORY_ORIGIN_TO_NAME_VIEW_MAP)[AnnouncementCategoryOrigin]['abbreviatedName'];

export const selectedCategoryOriginAtom =
  atom<AnnouncementCategoryOrigin>('FA1');
