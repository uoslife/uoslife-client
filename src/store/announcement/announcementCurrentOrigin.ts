import {atom} from 'jotai';
import {
  AnnouncementOriginNameType,
  DEFAULT_ANNOUNCEMENT_ORIGIN,
} from '../../configs/announcement';

const announcementCurrentOriginAtom = atom<AnnouncementOriginNameType>(
  DEFAULT_ANNOUNCEMENT_ORIGIN,
);

export default announcementCurrentOriginAtom;
