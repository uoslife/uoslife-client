import {AnnouncementOriginNameType} from '../../../../configs/announcement';
import {
  ArticleDetailType,
  ArticleItemType,
} from '../../../../types/announcement.type';

type AnnouncementPageableParamsType = {
  page: number;
  size: number;
};

export type GetAnnouncementsParams = AnnouncementPageableParamsType & {
  origin: AnnouncementOriginNameType;
};

export type GetAnnouncementsRes = {
  // 유일한 실 사용 필드
  content: ArticleItemType[];

  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type GetAnnouncementByIdParams = {id: number};

export type GetAnnouncementByIdRes = ArticleDetailType;

export type SearchAnnouncementsParams = AnnouncementPageableParamsType & {
  keyword: string;
};

export type SearchAnnouncementsRes = {
  // 유일한 실 사용 필드
  content: ArticleItemType[];

  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type GetAnnouncementByIdListParams = {idList: number[]};
export type GetAnnouncementByIdListRes = ArticleItemType[];

export type SearchAnnouncementsOptionallyParams =
  AnnouncementPageableParamsType & {
    title?: string;
    writer?: string;
    department?: string;
    description?: string;
  };

export type SearchAnnouncementsOptionallyRes = {
  // 유일한 실 사용 필드
  content: ArticleItemType[];

  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
};
