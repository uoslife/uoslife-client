export type ArticleCategoryName =
  | '일반공지'
  | '학사공지'
  | '채용공고'
  | '창업공지';

export type AnnouncementCategoryState = {
  name: ArticleCategoryName;
  isSelected: boolean;
}[];

export type Article = {
  bookmarkCnt: number;
  bookmarkByMe: boolean;
  title: string;
  category: ArticleCategoryName;
  body: string;
  department: string; // XX과
  uploadTime: Date;
  id: string;
  attachments: string[]; // 첨부파일
};
