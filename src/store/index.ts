import { configureStore, combineReducers } from '@reduxjs/toolkit';
import countriesReducer from '@/features/countries/slice';

const rootReducer = combineReducers({
  countries: countriesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
