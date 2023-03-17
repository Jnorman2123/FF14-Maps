import { configureStore } from '@reduxjs/toolkit';
import classesSlice from './slices/classesSlice';
import questTypesSlice from './slices/questTypesSlice';
import { helperquestApi } from './services/helperquest';
import { useDispatch as useDispatchBase, useSelector as useSelectorBase } from 'react-redux';

export const store = configureStore({
  reducer: {
    classes: classesSlice,
    questTypes: questTypesSlice,
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