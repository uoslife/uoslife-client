import {Article} from '../types/announcement.type';

export const ANNOUNCEMENT_LIST_MOCK_DATA: Article[] = new Array(300)
  .fill(null)
  .map((_, i) => ({
    bookmarkCnt: i % 5,
    department: `category${i}`,
    title: `titletitletitletitletitletitletitletitletitletitleletitletitletitle${i}`,
    uploadTime: new Date(),
    bookmarkByMe: !!(i % 5) && !!(i % 2),
    body: 'bodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybody',
    id: `id${i}`,
    category:
      i % 4 === 0
        ? '일반공지'
        : i % 4 === 1
        ? '학사공지'
        : i % 4 === 2
        ? '채용공고'
        : '창업공지',
    attachments: i % 3 === 0 ? [] : ['첨부파일 1', '첨부파일 2'],
  }));
