import { configureStore } from '@reduxjs/toolkit';
import user from './slices/userSlice';
// import authReducer from './slices/auth';
// import messageReducer from './slices/message';

const store = configureStore({
  reducer: { user },
  devTools: true,
});

export default store;
