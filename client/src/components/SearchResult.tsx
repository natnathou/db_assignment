import React from 'react';
import { useAppSelector } from '../reducers';

const SearchResult = () => {
  const apiDuckduckgoState = useAppSelector((state) => state.apiDuckduckgo);

  const SearchResultRendering = () =>
    apiDuckduckgoState?.searchResult?.map((result) => {
      return (
        <div key={result.Name}>
          <div>{result.FirstURL}</div>
          <div>{result.Text}</div>
        </div>
      );
    });
  return <div>{SearchResultRendering()}</div>;
};

export default SearchResult;
