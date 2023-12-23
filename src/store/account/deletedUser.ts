import {atom} from 'jotai';

export type DeletedUserStatusType = {
  isDelete: boolean;
};

const initDeletedUserStatus = {
  /** 기본값: false, true 경우 서버에서 기존 유저 정보를 복구하지 않고 삭제합니다. */
  isDelete: false,
};

export const deletedUserStatusAtom = atom<DeletedUserStatusType>(
  initDeletedUserStatus,
);
