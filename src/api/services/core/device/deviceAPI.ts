import {get, patch} from '../../../core/methods';
import DeviceService from './deviceAPI.interface';
import * as Type from './deviceAPI.type';

const DeviceAPI: DeviceService = {
  getDeviceInfo: () => get<Type.GetDeviceInfoRes>('core/devices'),
  patchDeviceInfo: params =>
    patch<Type.PatchDeviceInfoRes>('core/devices', params),
};
export default DeviceAPI;
