import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { AppDispatch, RootState } from '.';
import { RelatedTopic } from '../models/searchModels';
import { updateFormValueSearch } from './formSlice';
interface ApiDuckduckgoState {
  searchResult: RelatedTopic[];
  isPending: boolean;
  isRejected: boolean;
  searchHistory: { searchValue: string; result: RelatedTopic[]; id: number }[];
}

const initialState: ApiDuckduckgoState = {
  searchResult: [],
  isPending: false,
  isRejected: false,
  searchHistory: [],
};

interface SearchApiDuckduckgoPayload {
  response: RelatedTopic[];
  error: any;
}

interface SetActiveTabPayload {
  response: RelatedTopic[];
}

export const searchApiDuckduckgo = createAsyncThunk<
  SearchApiDuckduckgoPayload,
  { text: string }
>('apiDuckduckgo/search', async ({ text }) => {
  try {
    const config: AxiosRequestConfig = {
      params: { q: text, format: 'json' },
    };
    const response = await axios.get<any>(`https://api.duckduckgo.com/`, config);

    return { response: response.data.RelatedTopics as RelatedTopic[], error: false };
  } catch (e) {
    return { error: true } as any;
  }
});

export const setActiveTab = createAsyncThunk<
  SetActiveTabPayload,
  { id: number },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('apiDuckduckgo/setActiveTab', async ({ id }, thunkApi) => {
  try {
    let state = thunkApi.getState();
    const rightTab = state.apiDuckduckgo.searchHistory.filter((x) => x.id === id)[0];
    await thunkApi.dispatch(updateFormValueSearch(rightTab.searchValue));

    return { response: rightTab.result };
  } catch (error) {
    return { response: [] };
  }
});

const apiDuckduckgoSlice = createSlice({
  name: 'apiDuckduckgo',
  initialState,
  reducers: {
    updateHistoryApiDuckduckgo(state, action: PayloadAction<string>) {
      const searchHistoryUpdated = [
        ...state.searchHistory,
        {
          id: state.searchHistory.length + 1,
          searchValue: action.payload,
          result: state.searchResult,
        },
      ];
      state.isPending = false;
      return { ...state, searchHistory: searchHistoryUpdated };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchApiDuckduckgo.pending, (state, action) => {
      return { ...state, isPending: true };
    });
    builder.addCase(searchApiDuckduckgo.rejected, (state, action) => {
      return { ...state, isPending: false, isRejected: true, searchResult: [] };
    });
    builder.addCase(searchApiDuckduckgo.fulfilled, (state, action) => {
      if (!action.payload.error)
        return { ...state, isPending: false, searchResult: action.payload.response };
      else return { ...state, isPending: false, searchResult: [] };
    });
    builder.addCase(setActiveTab.fulfilled, (state, action) => {
      return { ...state, searchResult: action.payload.response };
    });
    builder.addCase(setActiveTab.pending, (state, action) => {});
    builder.addCase(setActiveTab.rejected, (state, action) => {});
  },
});

export const { updateHistoryApiDuckduckgo } = apiDuckduckgoSlice.actions;
export default apiDuckduckgoSlice.reducer;
