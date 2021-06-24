import React, { useEffect, useState, MouseEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../reducers';
import purify from 'dompurify';
import { RelatedTopic } from '../models/searchModels';
import '../sass/SearchResult.scss';
import { setActivePage } from '../reducers/apiDuckduckgoSlice';

const SearchResult = () => {
  const apiDuckduckgoState = useAppSelector((state) => state.apiDuckduckgo);
  const dispatch = useAppDispatch();

  const [numberItemByPage] = useState(4);
  const [searchResultOrdered, setSearchResultOrdered] = useState<RelatedTopic[][]>([]);

  const setPagination = useCallback(() => {
    let arrayInternal: RelatedTopic[] = [];
    let arrayExternal: RelatedTopic[][] = [];
    let c = 0;
    for (let i = 0; i < apiDuckduckgoState?.searchResult?.length; i++) {
      arrayInternal = [];
      if (i % c === 0 || c === 0) {
        for (
          let j = 0;
          j < numberItemByPage && i + j < apiDuckduckgoState?.searchResult?.length;
          j++
        ) {
          arrayInternal.push(apiDuckduckgoState?.searchResult[i + j]);
          c++;
        }
        arrayExternal.push(arrayInternal);
      }
    }

    setSearchResultOrdered(arrayExternal);
  }, [apiDuckduckgoState?.searchResult, numberItemByPage]);

  useEffect(() => {
    setPagination();
  }, [apiDuckduckgoState?.searchResult, setPagination]);

  useEffect(() => {
    dispatch(setActivePage(1));
  }, [dispatch]);

  const SearchResultRendering = () =>
    searchResultOrdered[apiDuckduckgoState?.activePage - 1]?.map((result, i) => {
      return (
        <div className='searchResult__list__item' key={i}>
          <div dangerouslySetInnerHTML={{ __html: purify.sanitize(result.FirstURL) }} />
          <div dangerouslySetInnerHTML={{ __html: purify.sanitize(result.Text) }} />
        </div>
      );
    });

  const numberOfPageRendering = () =>
    searchResultOrdered?.map((x, i) => {
      const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        dispatch(setActivePage(i + 1));
      };

      if (i === apiDuckduckgoState.activePage - 1)
        return (
          <div key={i} onClick={handleClick} className='page-item'>
            <a className='page-link' href='http/localhost:3000'>
              {i + 1}
            </a>
          </div>
        );
      else
        return (
          <div key={i} className='page-item disabled' onClick={handleClick}>
            <a className='page-link' href='http/localhost:3000'>
              {i + 1}
            </a>
          </div>
        );
    });
  return (
    <div className='searchResult'>
      <nav className='searchResult__pagination' aria-label='Page navigation example'>
        <ul className='pagination justify-content-center'>
          {apiDuckduckgoState.activePage !== 0 && numberOfPageRendering()}
        </ul>
      </nav>
      {apiDuckduckgoState?.searchResult?.length > 0 && (
        <div className='searchResult__list'>
          <div className='searchResult__list__title'>
            <div>Url</div>
            <div>Description</div>
          </div>
          {SearchResultRendering()}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
