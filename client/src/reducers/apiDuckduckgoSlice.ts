import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { AppDispatch, RootState } from '.';
import { RelatedTopic } from '../models/searchModels';
import { updateFormValueSearch } from './formSlice';
interface ApiDuckduckgoState {
  searchResult: RelatedTopic[];
  searchResultInitialValue: RelatedTopic[];
  isPending: boolean;
  isRejected: boolean;
  searchHistory: { searchValue: string; result: RelatedTopic[]; id: number }[];
  searchResultAtLeastOneManualUpdated: boolean;
}

const initialState: ApiDuckduckgoState = {
  searchResult: [],
  searchResultInitialValue: [],
  isPending: false,
  isRejected: false,
  searchHistory: [],
  searchResultAtLeastOneManualUpdated: false,
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

export const boldWordIfFound = createAsyncThunk<
  string,
  { value: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('apiDuckduckgo/boldWordIfFound', async ({ value }, thunkApi) => {
  const state = thunkApi.getState();

  const searchResultUpdated = state.apiDuckduckgo.searchResult.map((x) => {
    let newObj = { ...x };
    let regex = new RegExp(value, 'gi');
    newObj.FirstURL = newObj.FirstURL.replace(regex, `<span class=bold>${value}</span>`);
    newObj.Text = newObj.Text.replace(regex, `<span class=bold>${value}</span>`);

    return newObj;
  });

  await thunkApi.dispatch(manualUpdateSearchResult(searchResultUpdated));
  return value;
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
    manualUpdateSearchResult(state, action: PayloadAction<RelatedTopic[]>) {
      return { ...state, searchResult: action.payload };
    },
    oneManualUpdateSearchResultSet(state, action: PayloadAction<undefined>) {
      return { ...state, searchResultAtLeastOneManualUpdated: true };
    },
    saveSearchResultInitialValue(state, action: PayloadAction<undefined>) {
      return { ...state, searchResultInitialValue: [...state.searchResult] };
    },
    resetSearchResult(state, action: PayloadAction<undefined>) {
      return { ...state, searchResult: [...state.searchResultInitialValue] };
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

export const {
  updateHistoryApiDuckduckgo,
  manualUpdateSearchResult,
  oneManualUpdateSearchResultSet,
  saveSearchResultInitialValue,
  resetSearchResult,
} = apiDuckduckgoSlice.actions;
export default apiDuckduckgoSlice.reducer;
