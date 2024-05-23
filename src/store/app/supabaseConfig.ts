import {atomWithQuery} from 'jotai-tanstack-query';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import {ConfigAPI} from '../../api/services';

export type AppEnvironment = 'production' | 'alpha';
export type AppConfig = Map<string, string | string[]>;

export type SupabaseConfigAtomType = {
  hasNetworkError: boolean;
  isLatestVersion?: boolean;
  config?: AppConfig;
  environment?: AppEnvironment;
  isMaintenance?: boolean;
};

const changeAppVersionInt = (appVersion: string) =>
  parseInt(appVersion.split('.').join(''));

const supabaseConfigAtom = atomWithQuery<SupabaseConfigAtomType>(() => ({
  queryKey: ['getSupabaseConfig', Platform.OS],
  queryFn: async () => {
    const environment = DeviceInfo.getBundleId().match('alpha')
      ? 'alpha'
      : 'production';
    const isProduction = environment === 'production';
    const configs: AppConfig = new Map();
    try {
      const remoteConfigs = await ConfigAPI.getSupabaseConfig();
      remoteConfigs.forEach(({code, production, alpha}) => {
        const value: string = isProduction ? production : alpha ?? production;

        if (!value.includes('\n')) return configs.set(code, value);
        return configs.set(code, value.split('\n'));
      });
      console.info(`[Supabase] ${configs.size} Configs loaded.`);
    } catch (e) {
      console.error(e);
      return {
        hasNetworkError: true,
      };
    }
    const isLatestVersion =
      Platform.OS === 'ios'
        ? changeAppVersionInt(
            configs.get('app.version.latest.ios') as string,
          ) <= changeAppVersionInt(DeviceInfo.getVersion())
        : changeAppVersionInt(
            configs.get('app.version.latest.android') as string,
          ) <= changeAppVersionInt(DeviceInfo.getVersion());

    const isMaintenance = configs?.get('app.block') !== 'NO';

    return {
      hasNetworkError: false,
      config: configs,
      environment,
      isLatestVersion,
      isMaintenance,
    };
  },
}));

export default supabaseConfigAtom;
