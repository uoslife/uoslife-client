import type {Config} from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!(jest-)?@?react-native|moti/.*)'],
  preset: '@testing-library/react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['./jest-setup.ts'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
};

export default config;
