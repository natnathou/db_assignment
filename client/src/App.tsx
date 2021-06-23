import React, { useEffect } from 'react';
import FindInput from './components/FindInput';
import SearchInput from './components/SearchInput';
import SearchResult from './components/SearchResult';
import TabsHistory from './components/TabsHistory';
import { useAppDispatch } from './reducers';
import { getStateFromBackend } from './reducers/apiBackendSlice';

const App = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getStateFromBackend())

  }, [dispatch])


  return (
    <div className='App'>
      <div>
        <SearchInput />
        <SearchResult />
      </div>
      <TabsHistory />

      <FindInput />
    </div>
  );
};

export default App;
