import { configureStore, combineReducers } from '@reduxjs/toolkit';
import homeReducer from '@/features/home/slice';

const rootReducer = combineReducers({
  home: homeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
