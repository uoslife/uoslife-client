/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {
  createSentryMetroSerializer,
} = require('@sentry/react-native/dist/js/tools/sentryMetroSerializer');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },

  serializer: {
    customSerializer: createSentryMetroSerializer(),
  },
};
