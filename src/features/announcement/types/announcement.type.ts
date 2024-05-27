import {AnnouncementOriginNameType} from '../constants/announcement';

/** List 내부의 ArticleItem(상세 정보 미포함) */
export type ArticleItemType = {
  id: number;
  title: string;
  department: string;
  date: Date;
  bookmarkCount: number;
  origin: AnnouncementOriginNameType;
  isBookmarked: boolean;
};

/** 게시글 상세 정보 */
export type ArticleDetailType = ArticleItemType & {
  writer: string;
  files: {[key in string]: string};
  description: string;
  origin: AnnouncementOriginNameType;
  viewCount: number;
  url: string;
};
