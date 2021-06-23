import React, { ChangeEvent, useCallback } from 'react';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../reducers';
import {
  boldWordIfFound,
  oneManualUpdateSearchResultSet,
  saveSearchResultInitialValue,
} from '../reducers/apiDuckduckgoSlice';
import { updateFormValueFind } from '../reducers/formSlice';

const FindInput = () => {
  const formValueState = useAppSelector((state) => state.formValue);
  const searchResultAtLeastOneManualUpdated = useAppSelector(
    (state) => state.apiDuckduckgo.searchResultAtLeastOneManualUpdated
  );

  const dispatch = useAppDispatch();

  const query = async (value: string) => {
    if (!searchResultAtLeastOneManualUpdated) {
      await dispatch(saveSearchResultInitialValue());
      await dispatch(oneManualUpdateSearchResultSet());
    }

    dispatch(boldWordIfFound({ value }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedQuery = useCallback(
    _.debounce((value: string) => query(value), 700),
    [searchResultAtLeastOneManualUpdated]
  );

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    await dispatch(updateFormValueFind(event.target.value));
    delayedQuery(event.target.value);
  };

  return (
    <div className='FindInput'>
      <input
        className='form-control'
        type='text'
        value={formValueState.valueFind}
        onChange={handleChange}
        placeholder='Find'
      />
    </div>
  );
};

export default FindInput;
