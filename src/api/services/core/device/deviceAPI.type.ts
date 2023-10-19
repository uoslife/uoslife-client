export type DeviceInfoType = {
  firebasePushToken: string;
  model: string;
  os: string;
  osVersion: string;
  appVersion: string;
  codePushVersion: string;
};

type DeviceInfoResType = DeviceInfoType & {ip: string; lastUsedAt: string};

export type GetDeviceInfoParams = {};
export type GetDeviceInfoRes = DeviceInfoResType;
export type PatchDeviceInfoParams = DeviceInfoType;
export type PatchDeviceInfoRes = DeviceInfoResType;
