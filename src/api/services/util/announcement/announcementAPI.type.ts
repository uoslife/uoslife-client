import {
  ArticleDetailType,
  ArticleItemType,
} from '../../../../types/announcement.type';

export type AnnouncementOriginNameType = 'FA1' | 'FA2' | 'FA34' | 'FA35';

type AnnouncementPageableParamsType = {
  page: number;
  size: number;
};

export type GetAnnouncementsParams = AnnouncementPageableParamsType & {
  origin: AnnouncementOriginNameType;
};

export type GetAnnouncementsRes = {
  // 지금 시점에서 실사용하는 유일한 필드
  content: Omit<ArticleItemType, 'isBookmarkedByMe'>[]; // TODO: 해당 endpoint가 isBookmarkedByMe 필드를 호출하도록 변경된다면 그에 맞춰 대응 필요

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
  // 지금 시점에서 실사용하는 유일한 필드
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

export type getAnnouncementByIdListParams = {idList: number[]};
export type getAnnouncementByIdListRes = ArticleItemType[];

// NOT-IN-USE(23 / 10 / 14)

// export type SearchAnnouncementsOptionallyParams =
//   AnnouncementPageableParamsType & {
//     title: string;
//     writer: string;
//     department: string;
//     description: string;
//   };

// export type SearchAnnouncementsOptionallyRes = {
//   totalPages: number;
//   totalElements: number;
//   size: number;
//   content: [
//     {
//       id: number;
//       title: string;
//       writer: string;
//       department: string;
//       // TODO: 백엔드에 물어보기(근데 필요없지않나?)
//       files: {
//         additionalProp1: {};
//         additionalProp2: {};
//         additionalProp3: {};
//       };
//       description: string;
//       origin: string;
//       date: string;
//       bookmarkCount: number;
//       viewCount: number;
//       url: string;
//     },
//   ];
//   number: number;
//   sort: {
//     empty: boolean;
//     sorted: boolean;
//     unsorted: boolean;
//   };
//   numberOfElements: number;
//   pageable: {
//     offset: number;
//     sort: {
//       empty: boolean;
//       sorted: boolean;
//       unsorted: boolean;
//     };
//     pageNumber: number;
//     pageSize: number;
//     paged: boolean;
//     unpaged: boolean;
//   };
//   first: boolean;
//   last: boolean;
//   empty: boolean;
// };
