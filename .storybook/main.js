// import * as path from 'path';

const config = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-react-native-web',
    'storybook-addon-designs',
    '@storybook/addon-styling',
  ],
  features: {
    storyStoreV7: false,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        lazyCompilation: true,
      },
    },
  },
  docs: {
    autodocs: true,
  },
  refs: {
    'design-system': {
      title: 'Uoslife Design System',
      url: 'https://64b9450f2349802be4de6cf1-ntukyzkxkx.chromatic.com/',
    },
  },
  // webpackFinal: async config => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     'react-native$': 'react-native-web',
  //     '@storybook/react-native': '@storybook/react-webpack5',
  //   };
  //   return config;
  // },
  // webpackFinal: config => {
  //   // custom config for storybook to work with react-native-web
  //   return {
  //     ...config,
  //     resolve: {
  //       ...config.resolve,
  //       modules: [
  //         path.resolve('./src'),
  //         ...(config.resolve?.modules ?? []),
  //         '../__webpack__', // stub modules that shouldn't be bundled
  //       ],
  //       // fallback: {
  //       //   // polyfill node modules
  //       //   timers: false,
  //       //   tty: false,
  //       //   os: false,
  //       //   http: false,
  //       //   https: false,
  //       //   zlib: false,
  //       //   util: false,
  //       //   stream: require.resolve('stream-browserify'),
  //       //   constants: require.resolve('constants-browserify'),
  //       //   ...config.resolve?.fallback,
  //       // },
  //     },
  //   };
  // },
};

export default config;
