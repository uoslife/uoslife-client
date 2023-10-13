import {ServiceFunc} from '../../type';
import * as Type from './deviceAPI.type';

export default interface deviceService {
  getDeviceInfo: ServiceFunc<Type.GetDeviceInfoParams, Type.GetDeviceInfoRes>;
  patchDeviceInfo: ServiceFunc<
    Type.PatchDeviceInfoParams,
    Type.PatchDeviceInfoRes
  >;
}
