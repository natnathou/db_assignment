import React from 'react';
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
    </div>
  );
};

export default App;
