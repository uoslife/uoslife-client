import 'react-native-url-polyfill/auto';
import ky from 'ky';
import {createClient} from '@supabase/supabase-js';
import supabase from '../configs/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiClient = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://api.uoslife.com',
});

export const cdnClient = apiClient.extend({
  prefixUrl: 'https://cdn.uoslife.net',
});

export const supabaseClient = createClient(supabase.URL, supabase.KEY, {
  auth: {storage: AsyncStorage},
});
