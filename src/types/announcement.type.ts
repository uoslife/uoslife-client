export const ALL_CATEGORY_NUMBERS = [0, 1, 2, 3] as const;

export type ArticleCategoryNum = (typeof ALL_CATEGORY_NUMBERS)[number];

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
