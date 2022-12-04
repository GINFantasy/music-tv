/*
 * @Description: dialog封装
 * @Autor: GuluGuluu
 * @Date: 2022-12-04 16:52:25
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 22:50:31
 */
import React from 'react';
import {Dialog, Text} from '@rneui/base';
import {useTheme} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import {useDialog} from '../../utils/reduxHooks';

export default function MyDialog() {
  const {dialog, shut} = useDialog();
  const {theme} = useTheme();
  const {text, title, visible, loading} = dialog;
  const {primary} = theme.colors;
  return (
    <Dialog
      isVisible={visible}
      overlayStyle={{
        ...styles.border,
        borderColor: primary,
      }}
      onBackdropPress={shut}>
      {loading ? (
        <Dialog.Loading />
      ) : (
        <>
          <Dialog.Title titleStyle={{color: primary}} title={title} />
          <Text style={{color: primary}}>{text}</Text>
        </>
      )}
    </Dialog>
  );
}

const styles = StyleSheet.create({
  border: {
    borderRadius: 16,
    borderWidth: 1,
  },
});
