import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import codePush from 'react-native-code-push';
import storage from '../storage';
import {CoreAPI} from '../api/services';
import {DeviceInfoType} from '../api/services/core/device/deviceAPI.type';

export default class DeviceService {
  static async getDeviceInfoFromLocal(): Promise<DeviceInfoType> {
    const firebasePushToken = storage.getString('firebasePushToken')!;
    const model = DeviceInfo.getModel();
    const os = Platform.OS.toUpperCase();
    const osVersion = Platform.Version.toString();
    const appVersion = DeviceInfo.getVersion();
    const codePushVersion = await this.getCodePushVersion();

    const deviceInfo: DeviceInfoType = {
      firebasePushToken,
      model,
      os,
      osVersion,
      appVersion,
      codePushVersion,
    };
    return deviceInfo;
  }

  static async getDeviceInfoFromServer(): Promise<DeviceInfoType> {
    try {
      const deviceInfo = await CoreAPI.getDeviceInfo({});
      return deviceInfo;
    } catch (error) {
      throw new Error('deviceInfo를 서버에서 가져오지 못했습니다.');
    }
  }

  static async getCodePushVersion(): Promise<string> {
    const metadata = await codePush.getUpdateMetadata();
    if (!metadata) return '';
    return metadata.label;
  }

  /** SignIn or SignUp 시 DeviceInfo를 patch합니다. */
  static async setDeviceInfo(): Promise<void> {
    const deviceInfo = await this.getDeviceInfoFromLocal();
    await CoreAPI.patchDeviceInfo(deviceInfo);
  }

  static async updateDeviceInfo(): Promise<void> {
    const localDeviceInfo = await this.getDeviceInfoFromLocal();
    const serverDeviceInfo = await this.getDeviceInfoFromServer();
    if (
      localDeviceInfo.appVersion !== serverDeviceInfo.appVersion ||
      localDeviceInfo.codePushVersion !== serverDeviceInfo.codePushVersion ||
      localDeviceInfo.firebasePushToken !==
        serverDeviceInfo.firebasePushToken ||
      localDeviceInfo.model !== serverDeviceInfo.model ||
      localDeviceInfo.os !== serverDeviceInfo.os ||
      localDeviceInfo.osVersion !== serverDeviceInfo.osVersion
    ) {
      await CoreAPI.patchDeviceInfo(localDeviceInfo);
    }
  }
}
