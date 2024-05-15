import {PortalAccountDtoType} from '../type';

export type RegisterPortalAccountParams = {
  username: string;
  password: string;
};
export type RegisterPortalAccountRes = PortalAccountDtoType;

export type GetPortalAccountRes = PortalAccountDtoType;

export type DeletePortalAccountRes = PortalAccountDtoType;
