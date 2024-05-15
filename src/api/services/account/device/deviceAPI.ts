import {get, post, patch} from '../../../core/methods';
import DeviceService from './deviceAPI.interface';
import * as Type from './deviceAPI.type';

const DeviceAPI: DeviceService = {
  getDeviceInfo: () => get<Type.GetDeviceInfoRes>('v1/devices', 'ACCOUNT'),
  postDeviceInfo: params =>
    post<Type.PostDeviceInfoRes>('v1/devices', params, 'ACCOUNT'),
  patchDeviceInfo: params => {
    const {id, ...rest} = params;
    return patch<Type.PatchDeviceInfoRes>(
      `v1/devices/${params?.id}`,
      rest,
      'ACCOUNT',
    );
  },
};
export default DeviceAPI;
