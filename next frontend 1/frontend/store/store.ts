import { configureStore } from '@reduxjs/toolkit';
import dataStoreSlice from './slices/dataStoreSlice';
import { helperquestApi } from './services/helperquest';
import { useDispatch as useDispatchBase, useSelector as useSelectorBase } from 'react-redux';

export const store = configureStore({
  reducer: {
    dataStore: dataStoreSlice,
    [helperquestApi.reducerPath]: helperquestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(helperquestApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);