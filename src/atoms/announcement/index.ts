import {atom} from 'jotai';
import {AnnouncementOriginNameType} from '../../api/services/util/announcement/announcementAPI.type';

export type AnnouncmentCategoryOriginType = AnnouncementOriginNameType;
export type AnnouncementCategoryNameType = '일반' | '학사' | '채용' | '창업';

export type AnnouncementCategoryStatusType = Array<{
  origin: AnnouncmentCategoryOriginType;
  name: AnnouncementCategoryNameType;
  isSelected: boolean;
}>;

const initCategoryStatus = [
  {origin: 'FA1', name: '일반', isSelected: true},
  {origin: 'FA2', name: '학사', isSelected: false},
  {origin: 'FA34', name: '채용', isSelected: false},
  {origin: 'FA35', name: '창업', isSelected: false},
] as AnnouncementCategoryStatusType;

export const categoryStatusAtom =
  atom<AnnouncementCategoryStatusType>(initCategoryStatus);
