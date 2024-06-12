import {Platform} from 'react-native';

const LINKING_ERROR = (packageName: string) =>
  `The package ${packageName} doesn't seem to be linked. Make sure: \n\n${Platform.select(
    {ios: "- You have run 'pod install'\n", default: ''},
  )}- You rebuilt the app after installing the package\n` +
  `- You are not using Expo managed workflow\n`;

export const throwLinkingError = (packageName: string) => {
  // eslint-disable-next-line no-new
  new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR(packageName));
      },
    },
  );
};
