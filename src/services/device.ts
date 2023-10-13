import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import {storage} from '../storage';
import {CoreAPI} from '../api/services';
import {DeviceInfoType} from '../api/services/core/device/deviceAPI.type';

export class DeviceService {
  static getDeviceInfoFromLocal(): DeviceInfoType {
    const firebasePushToken = storage.getString('firebasePushToken')!;
    const model = DeviceInfo.getModel();
    const os = Platform.OS.toUpperCase();
    const osVersion = Platform.Version.toString();
    const appVersion = DeviceInfo.getVersion();
    const codePushVersion = storage.getString('codePushVersion') ?? '';

    const deviceInfo: DeviceInfoType = {
      firebasePushToken,
      model,
      os,
      osVersion,
      version: '',
      appVersion,
      codePushVersion,
    };
    return deviceInfo;
  }

  static async getDeviceInfoFromServer(): Promise<DeviceInfoType> {
    const deviceInfo = await CoreAPI.getDeviceInfo({});
    return deviceInfo;
  }

  /** SignIn or SignUp 시 DeviceInfo를 patch합니다. */
  static async setDeviceInfo(): Promise<void> {
    const deviceInfo = this.getDeviceInfoFromLocal();
    await CoreAPI.patchDeviceInfo(deviceInfo);
  }
  static async updateDeviceInfo(): Promise<void> {
    const localDeviceInfo = this.getDeviceInfoFromLocal();
    const serverDeviceInfo = await this.getDeviceInfoFromServer();
    if (
      localDeviceInfo.appVersion !== serverDeviceInfo.appVersion ||
      localDeviceInfo.codePushVersion !== serverDeviceInfo.codePushVersion ||
      localDeviceInfo.firebasePushToken !==
        serverDeviceInfo.firebasePushToken ||
      localDeviceInfo.model !== serverDeviceInfo.model ||
      localDeviceInfo.os !== serverDeviceInfo.os ||
      localDeviceInfo.osVersion !== serverDeviceInfo.osVersion ||
      localDeviceInfo.version !== serverDeviceInfo.version
    )
      await CoreAPI.patchDeviceInfo(localDeviceInfo);
  }
}
