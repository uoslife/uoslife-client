module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
    'eslint-config-prettier',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
  },
  rules: {
    curly: 0,
    'import/no-unresolved': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', {variables: false}],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'global-require': 'off',
    'import/prefer-default-export': ['warn', {target: 'single'}],
    '@typescript-eslint/return-await': 'off',
    'react/function-component-definition': [
      2,
      {namedComponents: 'arrow-function'},
    ],
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'import/no-named-as-default': 'off',
    'react/jsx-props-no-spreading': [
      'error',
      {
        custom: 'ignore',
      },
    ],
    'default-case': 'off',
    'import/no-cycle': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
      },
    ],
    'no-plusplus': ['error', {allowForLoopAfterthoughts: true}],
    '@typescript-eslint/lines-between-class-members': ['error'],
    // Resource: https://noogoonaa.tistory.com/62
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react-native/no-inline-styles': 'off',
    radix: 'off',
    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': 'error',
  },
  plugins: ['prettier', '@tanstack/query'],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
