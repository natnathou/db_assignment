import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import apiDuckduckgoReducer from './apiDuckduckgoSlice';
import formValueSliceReducer from './formSlice';
import apiDbSliceReducer from './apiDbSlice';

const store = configureStore({
  reducer: {
    apiDuckduckgo: apiDuckduckgoReducer,
    formValue: formValueSliceReducer,
    apiDb: apiDbSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
