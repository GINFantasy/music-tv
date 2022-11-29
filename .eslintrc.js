/*
 * @Description:
 * @Version: 2.0
 * @Autor: GuluGuluu
 * @Date: 2022-10-17 00:50:45
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-11-24 02:09:27
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
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'linebreak-style': [0, 'error', 'windows'],
      },
    },
  ],
};
