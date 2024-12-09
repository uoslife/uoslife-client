import 'react-native-url-polyfill/auto';

import ky from 'ky';
import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../../configs/supabase';

import handleToken from './beforeRetry';
import {setAuthorizationHeader, startFirebasePerf} from './beforeRequest';
import beforeError from './beforeError';
import {
  BASE_API_URL,
  ACCOUNT_API_URL,
  CDN_API_URL,
  DEFAULT_API_RETRY_BACKOFFLIMIT,
  DEFAULT_API_RETRY_LIMIT,
  DEFAULT_API_TIMEOUT,
} from '../../configs/api';
import {terminateFirebasePerf} from './afterResponse';

export const baseApiClient = ky.create({
  prefixUrl: BASE_API_URL,

  hooks: {
    beforeError: [beforeError],
    beforeRequest: [startFirebasePerf],
    afterResponse: [terminateFirebasePerf],
  },
});

export const apiClient = baseApiClient.extend({
  timeout: DEFAULT_API_TIMEOUT,
  retry: {
    limit: DEFAULT_API_RETRY_LIMIT,
    backoffLimit: DEFAULT_API_RETRY_BACKOFFLIMIT,
  },
  hooks: {
    beforeRequest: [setAuthorizationHeader],
    beforeRetry: [handleToken],
  },
});

export const accountApiClient = apiClient.extend({
  prefixUrl: ACCOUNT_API_URL,
});

export const accountApiClientForRefresh = baseApiClient.extend({
  prefixUrl: ACCOUNT_API_URL,
});

export const cdnClient = apiClient.extend({
  prefixUrl: CDN_API_URL,
});

export const supabaseClient = createClient(supabase.URL, supabase.KEY, {
  auth: {storage: AsyncStorage},
});
