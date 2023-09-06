type GetAnnoucementsParamsDefaultType = {
  page?: number;
  size?: number;
};

export type GetAnnouncementsAllParams = GetAnnoucementsParamsDefaultType;

export type GetAnnouncementsBySearchParams = {
  keyword: string;
} & GetAnnoucementsParamsDefaultType;

export type GetAnnouncementsByOptionalSearchParams = {
  title: string;
  writer: string;
  department: string;
  description: string;
} & GetAnnoucementsParamsDefaultType;

type AnnouncementContentType = {
  id: string;
  title: string;
  writer: string;
  department: string;
  files: string;
  description: string;
  bookmarkCount: number;
  viewCount: number;
  url: string;
};

type AnnouncementSortType = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type GetAnnouncementsGeneralRes = {
  statusCode: number;
  message: string;

  totalElements: number;
  totalPages: number;
  size: number;
  content: AnnouncementContentType[];
  number: number;

  sort: AnnouncementSortType;
  first: boolean;
  last: boolean;

  numberOfElements: number;
  pageable: {
    offset: number;
    sort: AnnouncementSortType;

    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  empty: boolean;
};
