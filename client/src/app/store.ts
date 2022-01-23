import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/Auth/AuthSlice';
import todoReducer from '../features/Dashboard/Todo/TodoSlice';
import userReducer from '../features/Dashboard/User/UserSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    todo: todoReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
