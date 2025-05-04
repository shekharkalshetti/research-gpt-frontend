// context/ResearchContext.tsx
"use client";

import { ResearchResponse } from "@/services/research";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface SearchResult {
  id: string;
  query: string;
  timestamp: Date;
  response: ResearchResponse;
}

interface ResearchContextType {
  searchResults: SearchResult[];
  addSearchResult: (query: string, response: ResearchResponse) => string;
  clearSearchResults: () => void;
}

const ResearchContext = createContext<ResearchContextType | undefined>(
  undefined
);

export const ResearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const addSearchResult = (
    query: string,
    response: ResearchResponse
  ): string => {
    const newResultId = `search-${Date.now()}`;
    const newResult: SearchResult = {
      id: newResultId,
      query,
      timestamp: new Date(),
      response,
    };

    setSearchResults((prev) => [...prev, newResult]);
    return newResultId;
  };

  const clearSearchResults = () => {
    setSearchResults([]);
  };

  return (
    <ResearchContext.Provider
      value={{
        searchResults,
        addSearchResult,
        clearSearchResults,
      }}
    >
      {children}
    </ResearchContext.Provider>
  );
};

export const useResearch = () => {
  const context = useContext(ResearchContext);
  if (context === undefined) {
    throw new Error("useResearch must be used within a ResearchProvider");
  }
  return context;
};
