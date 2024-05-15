import {ServiceFunc, ServiceFuncWithoutParams} from '../../type';
import * as Type from './deviceAPI.type';

export default interface DeviceService {
  getDeviceInfo: ServiceFuncWithoutParams<Type.GetDeviceInfoRes>;
  postDeviceInfo: ServiceFunc<
    Type.PostDeviceInfoParams,
    Type.PostDeviceInfoRes
  >;
  patchDeviceInfo: ServiceFunc<
    Type.PatchDeviceInfoParams,
    Type.PatchDeviceInfoRes
  >;
}
