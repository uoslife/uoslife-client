import {Article} from '../types/announcement.type';

export const ANNOUNCEMENT_LIST_MOCK_DATA: Article[] = new Array(30)
  .fill(null)
  .map((_, i) => ({
    bookmarkCnt: i % 5,
    department: `category${i}`,
    title: `titletitletitletitletitletitletitletitletitletitleletitletitletitle${i}`,
    uploadTime: new Date(),
    bookmarkByMe: !!(i % 5) && !!(i % 2),
    body: 'bodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybody',
    id: `id${i}`,
    categoryNum: (i % 4) as 0 | 1 | 2 | 3,
    attachments: i % 3 === 0 ? [] : ['첨부파일 1', '첨부파일 2'],
  }));
