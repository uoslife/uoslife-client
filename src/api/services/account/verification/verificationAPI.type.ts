import {PortalAccountDtoType} from '../type';

export type RegisterPortalAccountParams = {
  username: string;
  password: string;
};
export type RegisterPortalAccountRes = PortalAccountDtoType;

export type GetPortalAccountParams = undefined;
export type GetPortalAccountRes = PortalAccountDtoType;

export type DeletePortalAccountParams = undefined;
export type DeletePortalAccountRes = PortalAccountDtoType;
