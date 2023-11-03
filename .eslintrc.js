module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
    'eslint-config-prettier',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
  },
  rules: {
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
    curly: 0,
  },
  plugins: ['prettier'],
  ignorePatterns: ['**/storybook-static'],
};
