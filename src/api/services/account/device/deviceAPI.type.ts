import {DeviceInfoResType, DeviceInfoType} from '../type';

export type GetDeviceInfoRes = Array<DeviceInfoResType>;

export type PostDeviceInfoParams = DeviceInfoType;
export type PostDeviceInfoRes = DeviceInfoResType;

export type PatchDeviceInfoParams = {
  id: number;
  osVersion: string;
  appVersion: string;
  codePushVersion: string;
  firebasePushToken: string;
};
export type PatchDeviceInfoRes = DeviceInfoResType;
