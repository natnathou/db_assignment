import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { RelatedTopic } from '../models/searchModels';

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
  },
});

export const { updateHistoryApiDuckduckgo } = apiDuckduckgoSlice.actions;
export default apiDuckduckgoSlice.reducer;
