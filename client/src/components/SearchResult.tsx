import React from 'react';
import { useAppSelector } from '../reducers';
import purify from 'dompurify';

const SearchResult = () => {
  const apiDuckduckgoState = useAppSelector((state) => state.apiDuckduckgo);

  const SearchResultRendering = () =>
    apiDuckduckgoState?.searchResult?.map((result) => {
      return (
        <div key={result.Name}>
          <div dangerouslySetInnerHTML={{ __html: purify.sanitize(result.FirstURL) }} />
          <div dangerouslySetInnerHTML={{ __html: purify.sanitize(result.Text) }} />
        </div>
      );
    });
  return <div>{SearchResultRendering()}</div>;
};

export default SearchResult;
