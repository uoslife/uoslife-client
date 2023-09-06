// params로부터 쿼리 스트링을 반환
const getQueryStringFromParams = (params: {
  [key in string]?: string | number | boolean;
}) => {
  // number, boolean -> string 처리를 위한 object
  const processedParams: {[key in string]: string} = {};

  for (const key in params) {
    const extractedValue = params[key];

    // 추출된 값이 undefined라면 실행 X
    if (extractedValue === undefined) continue;

    processedParams[key] = extractedValue.toString();
  }

  const queryStr = new URLSearchParams(processedParams).toString();

  return queryStr;
};
