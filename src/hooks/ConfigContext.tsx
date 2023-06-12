import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {ConfigAPI} from '../api';
import {RemoteConfig} from '../api/Config.model';
import DeviceInfo from 'react-native-device-info';

type AppEnvironment = 'production' | 'alpha';
type ConfigContextProps = {
  isLoading: boolean;
  config: RemoteConfig | null;
  environment: AppEnvironment;
};

const ConfigContext = createContext<ConfigContextProps>(
  {} as ConfigContextProps,
);

const ConfigContextProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [config, setConfig] = useState<RemoteConfig | null>(null);

  const isLoading = useMemo<boolean>(() => !config, [config]);
  const environment = useMemo<AppEnvironment>(
    () =>
      DeviceInfo.getBundleId().split('.').includes('alpha')
        ? 'alpha'
        : 'production',
    [],
  );

  const getRemoteConfig = async () => {
    return ConfigAPI.getRemoteConfig()
      .then(response => response.json<RemoteConfig>())
      .then(data => setConfig(data));
  };

  useEffect(() => {
    (async () => getRemoteConfig())();
  }, []);

  return (
    <ConfigContext.Provider value={{isLoading, environment, config}}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfigContext = () => useContext(ConfigContext);

export default ConfigContextProvider;
