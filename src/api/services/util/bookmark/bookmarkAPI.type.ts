import {ArticleItemType} from '../../../../types/announcement.type';

export type GetBookmarkedArticlesParams = {};
export type GetBookmarkedArticlesRes = {
  announcements: ArticleItemType[];
};

export type CancelBookmarkParams = {
  announcementId: number;
};
export type CancelBookmarkRes = {
  announcements: ArticleItemType[];
};

export type PostBookmarkParams = {
  announcementId: number;
};
export type PostBookmarkRes = {
  announcements: ArticleItemType[];
};
