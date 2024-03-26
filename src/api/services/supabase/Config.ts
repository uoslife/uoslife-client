import {supabaseClient} from '../../core/client';
import {SupabaseConfig} from './Config.type';

const getSupabaseConfig = async (): Promise<SupabaseConfig[]> => {
  const {data, error} = await supabaseClient.from('app_config').select('*');
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (error) throw error;
  return data as SupabaseConfig[];
};

const ConfigAPI = {
  getSupabaseConfig,
};

export default ConfigAPI;
