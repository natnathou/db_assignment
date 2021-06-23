import React, { Fragment, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../reducers';
import { setActiveTab } from '../reducers/apiDuckduckgoSlice';
import '../sass/TabsHistory.scss';

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
        <Fragment key={tab.id}>
          <div id-tab={tab.id} onClick={handleClick} className='TabsHistory__item'>
            {tab.searchValue}
          </div>
          <hr />
        </Fragment>
      );
    });

  return (
    <>
      {apiDuckduckgoState?.searchHistory?.length > 0 && (
        <div className='TabsHistory'>{TabsHistoryRendering()}</div>
      )}
    </>
  );
};

export default TabsHistory;
