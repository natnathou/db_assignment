import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { AppDispatch, RootState } from '.';
import { ApiDuckduckgoState, updateAllState } from './apiDuckduckgoSlice';

interface ApiBackendState {
  state: {}
}

const initialState: ApiBackendState = {
    state: {}
};


export const saveStateInBackend = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('apiBackendStateSlice/saveStateInBackend', async ( arg, thunkApi) => {
  try {

    
    const config: AxiosRequestConfig = {
      data: thunkApi.getState().apiDuckduckgo
    };
    const response = await axios.post<{message: string}>(`/api/savestate`, config);
    console.log(response)
    
  } catch (e) {
   
  }
});

export const getStateFromBackend = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('apiBackendStateSlice/getStateFromBackend', async ( arg, thunkApi) => {
  try {

    const response = await axios.get<ApiDuckduckgoState>(`/api/savestate`);
   thunkApi.dispatch(updateAllState(response.data))
    
  } catch (e) {
   
  }
});

const apiBackendSlice = createSlice({
  name: 'apiBackendSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveStateInBackend.pending, (state, action) => {
    });
    builder.addCase(saveStateInBackend.rejected, (state, action) => {
    });
    builder.addCase(saveStateInBackend.fulfilled, (state, action) => {
    });
  },
});


export default apiBackendSlice.reducer;
