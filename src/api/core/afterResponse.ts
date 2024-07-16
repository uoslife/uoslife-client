import {AfterResponseHook} from 'ky';
import {getHeader, getContentLength} from '../../utils/api';

export const terminateFirebasePerf: AfterResponseHook = async (
  request,
  options,
  response,
) => {
  const {status, headers} = response;
  // @ts-expect-error: options have metric property
  const {metric} = options;
  metric.setHttpResponseCode(status);
  metric.setResponseContentType(getHeader('Content-Type', headers));
  metric.setResponsePayloadSize(getContentLength(headers));
  await metric.stop();
};
