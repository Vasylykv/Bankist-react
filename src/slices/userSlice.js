import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../hooks/http.hook';

const BASE_URL = 'http://localhost:5000';

const initialState = {
  isLoggedIn: false,
  user: null,
  userLoadingStatus: 'idle',
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ email, password }, thunkAPI) => {
    const { request } = useHttp();
    return await request(
      `${BASE_URL}/api/auth/login`,
      'POST',
      JSON.stringify({ email, password })
    );
  }
);

export const makeTransfer = createAsyncThunk(
  'user/makeTransfer',
  async ({ email, amount }, thunkAPI) => {
    const { request } = useHttp();
    return await request(
      `${BASE_URL}/api/transfer/${email}`,
      'PATCH',
      JSON.stringify({
        amount,
        senderId: thunkAPI.getState().user.user.id,
      })
    );
  }
);

export const closeAccount = createAsyncThunk(
  'user/closeAccount',
  async ({ email, password }, thunkAPI) => {
    const { request } = useHttp();
    const userId = thunkAPI.getState().user.user.id;
    return await request(
      `${BASE_URL}/users/${userId}`,
      'DELETE',
      JSON.stringify({ email, password })
    );
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.userLoadingStatus = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        return {
          ...state,
          user: action.payload,
          isLoggedIn: true,
          userLoadingStatus: 'idle',
        };
      })
      .addCase(fetchUser.rejected, (state) => {
        state.userLoadingStatus = 'error';
      })
      .addCase(makeTransfer.pending, (state) => {})
      .addCase(makeTransfer.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(makeTransfer.rejected, (state) => {})
      .addCase(closeAccount.pending, (state) => {})
      .addCase(closeAccount.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(closeAccount.rejected)
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = userSlice;

export default reducer;

export const { logout } = actions;
