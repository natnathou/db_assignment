import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { RelatedTopic, SearchModel } from '../models/searchModels';

interface ApiDuckduckgoState {
  searchResult: RelatedTopic[];
  isPending: boolean;
  isRejected: boolean;
  searchHistory: { searchValue: string; result: RelatedTopic[] }[];
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
    const config: AxiosRequestConfig = { params: { q: text, format: 'json' } };
    const response = await axios.get<SearchModel>(`http://api.duckduckgo.com/`, config);
    return { response: response.data.RelatedTopics as RelatedTopic[], error: false };
  } catch (e) {
    return { error: true } as any;
  }
});

const apiDuckduckgoSlice = createSlice({
  name: 'apiDuckduckgo',
  initialState,
  reducers: {
    updateHistoryApiDuckduckgo(
      state,
      action: PayloadAction<{ searchValue: string; result: RelatedTopic[] }>
    ) {
      return { ...state, searchHistory: [...state.searchHistory, action.payload] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchApiDuckduckgo.pending, (state, action) => {
      return { ...state, isPending: true };
    });
    builder.addCase(searchApiDuckduckgo.rejected, (state, action) => {
      return { ...state, isPending: false, isRejected: true };
    });
    builder.addCase(searchApiDuckduckgo.fulfilled, (state, action) => {
      if (!action.payload.error)
        return { ...state, isPending: false, searchResult: action.payload.response };
      else return { ...state };
    });
  },
});

export default apiDuckduckgoSlice.reducer;
