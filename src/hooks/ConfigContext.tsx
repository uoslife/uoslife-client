import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {ConfigAPI} from '../api';
import DeviceInfo from 'react-native-device-info';

type AppEnvironment = 'production' | 'alpha';
type AppConfig = Map<string, string | string[]>;

type ConfigContextProps = {
  isLoading: boolean;
  isError: boolean;
  config: AppConfig;
  environment: AppEnvironment;
};

const ConfigContext = createContext<ConfigContextProps>(
  {} as ConfigContextProps,
);

const ConfigContextProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [config, setConfig] = useState<AppConfig>(new Map());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const environment = useMemo<AppEnvironment>(
    () =>
      DeviceInfo.getBundleId().split('.').includes('alpha')
        ? 'alpha'
        : 'production',
    [],
  );
  const isProduction = useMemo<boolean>(
    () => environment === 'production',
    [environment],
  );

  useEffect(() => {
    (async () => {
      try {
        const configs: AppConfig = new Map();
        const remoteConfigs = await ConfigAPI.getSupabaseConfig();

        remoteConfigs.forEach(({code, production, alpha}) => {
          const value: string = isProduction ? production : alpha ?? production;

          if (!value.includes('\n')) return configs.set(code, value);
          return configs.set(code, value.split('\n'));
        });

        setConfig(configs);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isProduction]);

  return (
    <ConfigContext.Provider value={{isLoading, isError, environment, config}}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfigContext = () => useContext(ConfigContext);

export default ConfigContextProvider;
