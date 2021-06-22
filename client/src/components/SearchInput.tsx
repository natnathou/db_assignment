import React, { ChangeEvent, useCallback } from 'react';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../reducers';
import {
  searchApiDuckduckgo,
  updateHistoryApiDuckduckgo,
} from '../reducers/apiDuckduckgoSlice';
import { updateFormValueSearch } from '../reducers/formSlice';

const SearchInput = () => {
  const formValueState = useAppSelector((state) => state.formValue);
  const dispatch = useAppDispatch();

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
    await dispatch(updateFormValueSearch(event.target.value));
    delayedQuery(event.target.value);
  };

  return (
    <div>
      <input type='text' value={formValueState.valueSearch} onChange={handleChange} />
    </div>
  );
};

export default SearchInput;
