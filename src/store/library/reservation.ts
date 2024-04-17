import {atom} from 'jotai';

export type SelectedSeatAtomType = {
  seatId: number | null;
  forDisabledPerson: boolean | null;
};

export const initSelectedSeatAtom = {
  seatId: null,
  forDisabledPerson: null,
};

export const selectedSeatAtom =
  atom<SelectedSeatAtomType>(initSelectedSeatAtom);
