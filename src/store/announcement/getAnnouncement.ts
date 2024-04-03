import {atomWithSuspenseInfiniteQuery} from 'jotai-tanstack-query';

import {UtilAPI} from '../../api/services';
import {
  AnnouncementOriginNameType,
  DEFAULT_GET_ANNOOUNCEMENT_SIZE,
} from '../../configs/announcement';
import announcementCurrentOriginAtom from './announcementCurrentOrigin';

const getAnnouncement = atomWithSuspenseInfiniteQuery(get => ({
  queryKey: [
    'getAnnouncement',
    get(announcementCurrentOriginAtom),
    DEFAULT_GET_ANNOOUNCEMENT_SIZE,
  ],
  queryFn: async ({queryKey: [, id], pageParam}) => {
    return await UtilAPI.getAnnouncements({
      origin: id as AnnouncementOriginNameType,
      size: DEFAULT_GET_ANNOOUNCEMENT_SIZE,
      page: pageParam as number,
    });
  },
  getNextPageParam: (lastPage, allPages, lastPageParam) =>
    (lastPageParam as number) + 1,
  initialPageParam: 0,
}));

export default getAnnouncement;
