import ky, {AfterResponseHook} from 'ky';

const isDev = process.env.NODE_ENV !== 'production';

export const logging: AfterResponseHook = (request, _options, response) => {
  if (isDev) console.log(response);
  return ky(request);
};
