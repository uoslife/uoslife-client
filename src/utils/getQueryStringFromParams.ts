// params로부터 쿼리 스트링을 반환
export const generateQueryString = (params: {
  [key in string]: string | number | boolean;
}) =>
  Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
