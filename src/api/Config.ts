import {cdnClient} from './client';

const getRemoteConfig = async () => cdnClient.get('app_config.json');

export default {
  getRemoteConfig,
};
