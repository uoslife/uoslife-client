import {atom} from 'jotai';
import {
  AnnouncementOriginNameType,
  DEFAULT_ANNOUNCEMENT_ORIGIN,
} from '../constants/announcement';

const announcementCurrentOriginAtom = atom<AnnouncementOriginNameType>(
  DEFAULT_ANNOUNCEMENT_ORIGIN,
);

export default announcementCurrentOriginAtom;
