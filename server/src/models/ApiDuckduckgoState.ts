export interface Icon {
    Height: string;
    URL: string;
    Width: string;
}

export interface Icon2 {
    Height: string;
    URL: string;
    Width: string;
}

export interface Topic {
    FirstURL: string;
    Icon: Icon2;
    Result: string;
    Text: string;
}

export interface SearchResult {
    FirstURL: string;
    Icon: Icon;
    Result: string;
    Text: string;
    Name: string;
    Topics: Topic[];
}

export interface SearchHistory {
    id: number;
    searchValue: string;
    result: SearchResult[];
}

export interface ApiDuckduckgoState {
    searchResult?: SearchResult[];
    searchResultInitialValue?: SearchResult[];
    isPending?: boolean;
    isRejected?: boolean;
    searchHistory?: SearchHistory[];
    searchResultAtLeastOneManualUpdated?: boolean;
}