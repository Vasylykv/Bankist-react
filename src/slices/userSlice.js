import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../hooks/http.hook';

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
      `http://localhost:5000/api/auth/login`,
      'POST',
      JSON.stringify({ email, password })
    );
  }
);

export const makeTransfer = createAsyncThunk(
  'user/makeTransfer',
  async ({ email, amout }, thunkAPI) => {
    const { request } = useHttp();
    return await request(
      `http://localhost:5000/makeTransfer`,
      'PATCH',
      JSON.stringify({
        email,
        amout,
        senderId: thunkAPI.getState().user.user.id,
      })
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
      .addCase(makeTransfer.fulfilled, (state) => {})
      .addCase(makeTransfer.rejected, (state) => {})
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = userSlice;

export default reducer;

export const { logout } = actions;
