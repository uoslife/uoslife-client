const DEFAULT_INFO_STRING = '-';

const setUserInformationMessage = (info: string | undefined | null) =>
  info || DEFAULT_INFO_STRING;

export default setUserInformationMessage;
