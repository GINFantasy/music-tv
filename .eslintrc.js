/*
 * @Description:
 * @Version: 2.0
 * @Autor: GuluGuluu
 * @Date: 2022-10-17 00:50:45
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-07 17:19:36
 */
module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.jsx', '*.js'],
      rules: {
        '@typescript-eslint/no-shadow': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'linebreak-style': [0, 'error', 'windows'],
        'react-native/no-inline-styles': 0,
        'no-sparse-arrays': 0,
        'exhaustive-deps': 0,
        'no-return-assign': 0,
        'no-bitwise': 0,
      },
    },
  ],
};
