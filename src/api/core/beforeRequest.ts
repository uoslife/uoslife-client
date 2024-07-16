import {BeforeRequestHook} from 'ky';
import perf, {FirebasePerformanceTypes} from '@react-native-firebase/perf';
import DeviceInfo from 'react-native-device-info';
import storage from '../../storage';

export const setAuthorizationHeader: BeforeRequestHook = request => {
  const accessToken = storage.getString('accessToken');

  if (accessToken) {
    request.headers.set('Authorization', `Bearer ${accessToken}`);
  }
};

export const startFirebasePerf: BeforeRequestHook = async (
  request,
  options,
) => {
  const {url, method} = request;
  // @ts-expect-error: options have metric property
  // eslint-disable-next-line no-param-reassign
  options.metric = await perf().newHttpMetric(
    url,
    method as FirebasePerformanceTypes.HttpMethod,
  );

  // @ts-expect-error: options have metric property
  options.metric.putAttribute(
    'environment',
    DeviceInfo.getBundleId().match('alpha') ? 'alpha' : 'production',
  );
  // @ts-expect-error: options have metric property
  await options.metric.start();
};
