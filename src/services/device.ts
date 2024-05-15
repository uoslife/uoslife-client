import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import codePush from 'react-native-code-push';
import {captureException} from '@sentry/react-native';
import storage from '../storage';
import {AccountAPI} from '../api/services/account';
import {DeviceInfoResType, DeviceInfoType} from '../api/services/account/type';
import {PostDeviceInfoRes} from '../api/services/account/device/deviceAPI.type';

export default class DeviceService {
  static async getDeviceInfoFromLocal(): Promise<DeviceInfoType> {
    const firebasePushToken = storage.getString('firebasePushToken') ?? '';
    const model = DeviceInfo.getModel();
    const os =
      Platform.OS === 'ios'
        ? 'iOS'
        : Platform.OS.replace(/\b[a-z]/, letter => letter.toUpperCase());
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

  static async getDeviceInfoFromServer(): Promise<DeviceInfoResType | null> {
    try {
      const deviceInfo = await AccountAPI.getDeviceInfo();
      return deviceInfo[deviceInfo.length - 1];
    } catch (error) {
      captureException(error);
      return null;
    }
  }

  static async getCodePushVersion(): Promise<string> {
    try {
      const metadata = await codePush.getUpdateMetadata();
      if (!metadata) return '-';
      return metadata.label === '' ? '-' : metadata.label;
    } catch (error) {
      return '-';
    }
  }

  /** SignIn or SignUp 시 DeviceInfo를 최초 등록합니다. */
  static async setDeviceInfo(): Promise<PostDeviceInfoRes> {
    const deviceInfo = await this.getDeviceInfoFromLocal();
    return AccountAPI.postDeviceInfo(deviceInfo);
  }

  static async updateDeviceInfo(): Promise<DeviceInfoResType | undefined> {
    const [localDeviceInfo, serverDeviceInfo] = await Promise.all([
      this.getDeviceInfoFromLocal(),
      this.getDeviceInfoFromServer(),
    ]);
    if (!serverDeviceInfo) return;
    if (
      localDeviceInfo.appVersion !== serverDeviceInfo.appVersion ||
      localDeviceInfo.codePushVersion !== serverDeviceInfo.codePushVersion ||
      localDeviceInfo.firebasePushToken !==
        serverDeviceInfo.firebasePushToken ||
      localDeviceInfo.model !== serverDeviceInfo.model ||
      localDeviceInfo.os !== serverDeviceInfo.os ||
      localDeviceInfo.osVersion !== serverDeviceInfo.osVersion
    ) {
      const {model, os, ...rest} = localDeviceInfo;
      // eslint-disable-next-line consistent-return
      return AccountAPI.patchDeviceInfo({
        id: serverDeviceInfo.id,
        ...rest,
      });
    }
  }
}
