import {generateQueryString} from '../../../../utils/getQueryStringFromParams';
import {del, get, post} from '../../../core/methods';
import BookmarkService from './bookmarkAPI.interface';
import * as Type from './bookmarkAPI.type';

const BookmarkAPI: BookmarkService = {
  getBookmarkedArticles: () =>
    get<Type.GetBookmarkedArticlesRes>(`utility/bookmark`),
  cancelBookmark: params =>
    del<Type.CancelBookmarkRes>(
      `utility/bookmark?${generateQueryString(params)}`,
    ),
  postBookmark: params =>
    post<Type.PostBookmarkRes>(
      `utility/bookmark?${generateQueryString(params)}`,
      {},
    ),
};

export default BookmarkAPI;
