import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import FindInput from './components/FindInput';
import SearchInput from './components/SearchInput';
import SearchResult from './components/SearchResult';
import TabsHistory from './components/TabsHistory';
import { useAppDispatch, useAppSelector } from './reducers';
import { getStateFromBackend } from './reducers/apiBackendSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/App.scss';
import Loader from './components/Loader';
import ModalTemplate from './components/Modal';

const App = () => {
  const apiDuckduckgoState = useAppSelector((state) => state.apiDuckduckgo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStateFromBackend());
  }, [dispatch]);

  return (
    <Container className='app'>
      <div className='text-center app__header'>
        <div className='text-center app__title'>DB ISRAEL</div>
        <div className='text-center app__findSearch'>
          <FindInput />
        </div>
      </div>
      <div>
        <SearchInput />
        {apiDuckduckgoState.isPending ? <Loader /> : <SearchResult />}
      </div>
      <TabsHistory />
      <ModalTemplate />
    </Container>
  );
};

export default App;
