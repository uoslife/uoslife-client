// // params로부터 쿼리 스트링을 반환
// export const generateQueryString = (params: {
//   [key in string]: string | number | boolean;
// }) =>
//   Object.keys(params)
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//     .join('&');
export const generateQueryString = (params: {
  [key in string]:
    | string
    | number
    | boolean
    | {[key: string]: string | number | boolean};
}) =>
  Object.keys(params)
    .map(key => {
      const value = params[key];
      if (typeof value === 'object') {
        return Object.keys(value)
          .map(
            subKey =>
              `${encodeURIComponent(`${key}.${subKey}`)}=${encodeURIComponent(
                value[subKey],
              )}`,
          )
          .join('&');
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
