import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { AppDispatch, RootState } from '.';
import { ApiDuckduckgoState, updateAllState } from './apiDuckduckgoSlice';

interface ApiDbState {
  state: {};
}

const initialState: ApiDbState = {
  state: {},
};

export const saveStateInDb = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('apiDbStateSlice/saveStateInDb', async (arg, thunkApi) => {
  try {
    const config: AxiosRequestConfig = {
      data: thunkApi.getState().apiDuckduckgo,
    };
    const response = await axios.post<{ message: string }>(`/api/saveState`, config);
    console.log(response);
  } catch (e) {}
});

export const getStateFromDb = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('apiDbStateSlice/getStateFromDb', async (arg, thunkApi) => {
  try {
    const response = await axios.get<ApiDuckduckgoState>(`/api/getState`);
    thunkApi.dispatch(updateAllState(response.data));
  } catch (e) {}
});

const apiDbSlice = createSlice({
  name: 'apiDbSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveStateInDb.pending, (state, action) => {});
    builder.addCase(saveStateInDb.rejected, (state, action) => {});
    builder.addCase(saveStateInDb.fulfilled, (state, action) => {});
  },
});

export default apiDbSlice.reducer;
