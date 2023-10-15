import {AnnouncementOriginNameType} from '../api/services/util/announcement/announcementAPI.type';

export const announcementFullName: {
  [Origin in AnnouncementOriginNameType]: string;
} = {
  FA1: '일반공지',
  FA2: '학사공지',
  FA34: '채용공고',
  FA35: '창업공지',
};
