import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazemCoreApi } from './services/shazemCore';

export const store = configureStore({
  reducer: {
    [shazemCoreApi.reducerPath] : shazemCoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazemCoreApi.middleware),
});
