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

  static async getDeviceInfoFromServer(): Promise<DeviceInfoResType[] | null> {
    try {
      const deviceInfo = await AccountAPI.getDeviceInfo();
      return deviceInfo;
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

  static async setDeviceInfoWhenAuthentication() {
    const [localDeviceInfo, serverDeviceInfoList] = await Promise.all([
      this.getDeviceInfoFromLocal(),
      this.getDeviceInfoFromServer(),
    ]);
    if (!serverDeviceInfoList)
      return AccountAPI.postDeviceInfo(localDeviceInfo);
    const serverDeviceInfo = findCurrentDeviceInfo(
      localDeviceInfo,
      serverDeviceInfoList,
    );
    if (serverDeviceInfo)
      return this.synchronizeDeviceInfo(localDeviceInfo, serverDeviceInfo);
    return AccountAPI.postDeviceInfo(localDeviceInfo);
  }

  static async updateDeviceInfo() {
    const [localDeviceInfo, serverDeviceInfoList] = await Promise.all([
      this.getDeviceInfoFromLocal(),
      this.getDeviceInfoFromServer(),
    ]);
    if (!serverDeviceInfoList) return;
    const serverDeviceInfo = findCurrentDeviceInfo(
      localDeviceInfo,
      serverDeviceInfoList,
    );
    if (!serverDeviceInfo) return;
    await this.synchronizeDeviceInfo(localDeviceInfo, serverDeviceInfo);
  }

  static async synchronizeDeviceInfo(
    localDeviceInfo: DeviceInfoType,
    serverDeviceInfo: DeviceInfoResType,
  ) {
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

      return AccountAPI.patchDeviceInfo({
        id: serverDeviceInfo.id,
        ...rest,
      });
    }
    return null;
  }
}

const findCurrentDeviceInfo = (
  localDeviceInfo: DeviceInfoType,
  serverDeviceInfoList: DeviceInfoResType[],
): DeviceInfoResType | null => {
  return (
    serverDeviceInfoList
      ?.filter(
        item =>
          item.os === localDeviceInfo.os &&
          item.model === localDeviceInfo.model,
      )
      .sort((a, b) => b.id - a.id)[0] ?? null
  );
};
