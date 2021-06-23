import React, { useEffect, useState, MouseEvent, useCallback } from 'react';
import { useAppSelector } from '../reducers';
import purify from 'dompurify';
import { RelatedTopic } from '../models/searchModels';

const SearchResult = () => {
  const apiDuckduckgoState = useAppSelector((state) => state.apiDuckduckgo);
  
  const [activePage, setActivePage] = useState(1)
  const [searchResultOrdered, setSearchResultOrdered] = useState<RelatedTopic[][]>([])

  const setPagination = useCallback(
      ()=>{
        let arrayInternal:RelatedTopic[] = []
        let arrayExternal:RelatedTopic[][] = []
        let c = 0;
        for(let i=0; i< apiDuckduckgoState?.searchResult?.length; i++){
          arrayInternal=[]
          if(i%c === 0 || c=== 0)
          {
            for(let j=0; j< 2 && i + j < apiDuckduckgoState?.searchResult?.length; j++){
              arrayInternal.push(apiDuckduckgoState?.searchResult[i+j])
              c++
          }
          arrayExternal.push(arrayInternal)
          }
        }
        setSearchResultOrdered(arrayExternal)
        setActivePage(1)
      }
    ,
    [apiDuckduckgoState?.searchResult],
  )
  
  useEffect(() => {
    setPagination()
  }, [apiDuckduckgoState?.searchResult, setPagination])

  const SearchResultRendering = () =>
  searchResultOrdered[activePage-1]?.map((result) => {
      return (
        <div key={result.Name}>
          <div dangerouslySetInnerHTML={{ __html: purify.sanitize(result.FirstURL) }} />
          <div dangerouslySetInnerHTML={{ __html: purify.sanitize(result.Text) }} />
        </div>
      );
    });

  const numberOfPageRendering = ()=>searchResultOrdered?.map((x,i)=>{
    const handleClick=(event: MouseEvent<HTMLDivElement>)=>{
        setActivePage(i+1)
    }
    console.log(i)
    console.log(activePage)

    if(i===activePage-1)
      return <div className="active-page" onClick={handleClick}>{i+1}</div>
    else
    return <div onClick={handleClick}>{i+1}</div>

  })
  return <div>
    <div>{activePage !==0 && numberOfPageRendering()}</div>
    <div>{SearchResultRendering()}</div>
  </div>;
};

export default SearchResult;
