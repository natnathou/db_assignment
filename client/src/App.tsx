import React from 'react';
import FindInput from './components/FindInput';
import SearchInput from './components/SearchInput';
import SearchResult from './components/SearchResult';
import TabsHistory from './components/TabsHistory';

const App = () => {
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
