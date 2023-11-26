export type GetBookmarkedArticlesParams = {};
export type GetBookmarkedArticlesRes = {
  bookmarkInformation: number[] | null;
};

export type CancelBookmarkParams = {
  announcementId: number;
};
export type CancelBookmarkRes = {
  bookmarkInformation: number[];
};

export type PostBookmarkParams = {
  announcementId: number;
};
export type PostBookmarkRes = {
  bookmarkInformation: number[];
};
