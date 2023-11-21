import {ServiceFunc} from '../../type';
import * as Type from './bookmarkAPI.type';

export default interface BookmarkService {
  getBookmarkedArticles: ServiceFunc<
    Type.GetBookmarkedArticlesParams,
    Type.GetBookmarkedArticlesRes
  >;
  cancelBookmark: ServiceFunc<
    Type.CancelBookmarkParams,
    Type.CancelBookmarkRes
  >;
  postBookmark: ServiceFunc<Type.PostBookmarkParams, Type.PostBookmarkRes>;
}
