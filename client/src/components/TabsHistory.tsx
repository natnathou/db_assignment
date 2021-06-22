import React, { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../reducers';
import { setActiveTab } from '../reducers/apiDuckduckgoSlice';

const TabsHistory = () => {
  const apiDuckduckgoState = useAppSelector((state) => state.apiDuckduckgo);
  const dispatch = useAppDispatch();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const id = parseInt(event.currentTarget.getAttribute(`id-tab`) as string);

    dispatch(setActiveTab({ id }));
  };
  const TabsHistoryRendering = () =>
    apiDuckduckgoState?.searchHistory?.map((tab) => {
      return (
        <div key={tab.id} id-tab={tab.id} onClick={handleClick}>
          {tab.searchValue}
        </div>
      );
    });

  return <div>{TabsHistoryRendering()}</div>;
};

export default TabsHistory;
