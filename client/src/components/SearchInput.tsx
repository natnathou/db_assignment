import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../reducers';
import {
  searchApiDuckduckgo,
  updateHistoryApiDuckduckgo,
} from '../reducers/apiDuckduckgoSlice';

const SearchInput = () => {
  const apiDuckduckgoState = useAppSelector((state) => state.apiDuckduckgo);

  const searchResult = useMemo(
    () => apiDuckduckgoState.searchResult,
    [apiDuckduckgoState.searchResult]
  );
  const dispatch = useAppDispatch();

  const [input, _setInput] = useState('');
  const myInputRef = React.useRef(input);

  const setInput = (data: string) => {
    myInputRef.current = data;
    _setInput(data);
  };

  const query = async (value: string) => {
    await dispatch(searchApiDuckduckgo({ text: value }));
    await dispatch(updateHistoryApiDuckduckgo(value));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedQuery = useCallback(
    _.debounce((value: string) => query(value), 700),
    []
  );

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    await setInput(event.target.value);
    delayedQuery(event.target.value);
  };

  return (
    <div>
      <input type='text' value={input} onChange={handleChange} />
    </div>
  );
};

export default SearchInput;
