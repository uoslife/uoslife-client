import {atomWithSuspenseQuery} from 'jotai-tanstack-query';
import {atom} from 'jotai';
import {LibraryReservationType} from '../../../api/services/util/library/libraryAPI.type';
import LibraryServices from '../services/library';

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

// isFocusedLibraryAtom
export const isFocusedLibraryAtom = atom<boolean>(false);
const DEFAULT_GET_LIBRARY_RESERVATION_REFETCH_INTERVAL = 5 * 1000;

// libraryReservationAtom
const initialData: LibraryReservationAtomType = {
  reservationStatus: 'NOT_USING',
  reservationInfo: null,
  isStudyRoom: null,
};

export const libraryReservationAtom =
  atomWithSuspenseQuery<LibraryReservationAtomType>(get => ({
    queryKey: ['getLibraryReservation'],
    queryFn: () => LibraryServices.getLibraryReservation(),
    initialData,
    refetchInterval: get(isFocusedLibraryAtom)
      ? DEFAULT_GET_LIBRARY_RESERVATION_REFETCH_INTERVAL
      : false,
  }));
