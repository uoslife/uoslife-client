import {supabaseClient} from './client';
import {SupabaseConfig} from './Config.model';

const getSupabaseConfig = async (): Promise<SupabaseConfig[]> => {
  const {data, error} = await supabaseClient.from('app_config').select('*');
  if (error) throw error;
  return data as SupabaseConfig[];
};

export default {
  getSupabaseConfig,
};
