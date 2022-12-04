/*
 * @Description: redux仓库
 * @Autor: GuluGuluu
 * @Date: 2022-12-04 14:25:30
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 16:58:51
 */
import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import UserReducer from '../features/User/user.slice';
import DialogReducer from '../features/Dialog/dialog.slice';

export const rootReducer = {
  user: UserReducer,
  dialog: DialogReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
