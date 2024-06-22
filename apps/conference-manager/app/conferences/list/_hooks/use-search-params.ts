"use client";

import { useContext } from "react";

import { SearchParamsContext } from "../_providers/search-params";

function useSearchParams() {
  const context = useContext(SearchParamsContext);
  if (!context) {
    throw new Error(
      "useSearchParams must be used within a SearchParamsProvider",
    );
  }
  return context;
}

export { useSearchParams };
