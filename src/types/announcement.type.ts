import {AnnouncementCategoryId} from '../atoms/announcement';

export type Article = {
  bookmarkCnt: number;
  bookmarkByMe: boolean;
  title: string;
  categoryId: AnnouncementCategoryId;
  body: string;
  department: string; // XX과
  uploadTime: Date;
  id: string;
  attachments: string[]; // 첨부파일
};
