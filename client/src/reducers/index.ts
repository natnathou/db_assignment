import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import apiDuckduckgoReducer from './apiDuckduckgoSlice';

const store = configureStore({
  reducer: {
    apiDuckduckgo: apiDuckduckgoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

export default store;
