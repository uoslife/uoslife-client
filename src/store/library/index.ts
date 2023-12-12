import {atom} from 'jotai';
import {LibraryReservationType} from '../../api/services/util/library/libraryAPI.type';

export type ReservationStatusType =
  | 'USING'
  | 'NOT_USING'
  | 'NOT_PORTAL_VERIFICATION'
  | 'OUTING_DEFAULT'
  | 'OUTING_NO_TIME';
export const DEFAULT_RESERVATION_STATUS = 'NOT_USING' as const;
export type ReservationStatusTypeInUsing = Exclude<
  ReservationStatusType,
  'NOT_USING' | 'NOT_PORTAL_VERIFICATION'
>;

export type LibraryReservationAtomType = {
  reservationStatus: ReservationStatusType;
  reservationInfo: LibraryReservationType | null;
  isStudyRoom: boolean | null;
};

const initLibraryReservationAtom: LibraryReservationAtomType = {
  reservationStatus: 'NOT_USING',
  reservationInfo: null,
  isStudyRoom: null,
};

const libraryReservationAtom = atom<LibraryReservationAtomType>(
  initLibraryReservationAtom,
);

export default libraryReservationAtom;
