/** you can change alpha / prod api server prefix */
const ENABLE_ALPHA_API_SERVER = false;

const getApiServerPrefix = () => {
  return ENABLE_ALPHA_API_SERVER ? 'alpha.' : '';
};

const 초 = 1000;

export const DEFAULT_API_TIMEOUT = 3 * 초;
export const DEFAULT_API_RETRY_LIMIT = 4;
export const DEFAULT_API_RETRY_BACKOFFLIMIT = 0.5 * 초;

export const BASE_API_URL = `https://api.${getApiServerPrefix()}uoslife.com`;
export const ACCOUNT_API_URL = `https://account.${getApiServerPrefix()}uoslife.com`;
export const CDN_API_URL = 'https://cdn.uoslife.net';
