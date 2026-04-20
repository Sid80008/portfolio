"use client";

import { useSearchParams } from "next/navigation";
import React, { createContext, useContext, ReactNode } from "react";

const SearchParamsContext = createContext<ReturnType<typeof useSearchParams> | null>(null);

export function SearchParamsProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  return (
    <SearchParamsContext.Provider value={searchParams}>
      {children}
    </SearchParamsContext.Provider>
  );
}

export function useAppSearchParams() {
  const context = useContext(SearchParamsContext);
  if (!context) {
    throw new Error("useAppSearchParams must be used within a SearchParamsProvider");
  }
  return context;
}
