export type ArticleCategoryNum = 0 | 1 | 2 | 3;

export type Article = {
  bookmarkCnt: number;
  bookmarkByMe: boolean;
  title: string;
  categoryNum: ArticleCategoryNum;
  body: string;
  department: string; // XX과
  uploadTime: Date;
  id: string;
  attachments: string[]; // 첨부파일
};
