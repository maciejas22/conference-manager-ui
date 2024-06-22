"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ConferenceField, Order } from "@/graphql/__types__/types";

import { pageSizeOptions } from "../..//_options";
import { SearchParams } from "../..//_types";
import { searchParamsSchema } from "./schema";

const defaultValues: SearchParams = {
  page: 1,
  pageSize: pageSizeOptions[0],
  sort: ConferenceField.Date,
  sortDirection: Order.Desc,
  associatedOnly: false,
  title: "",
};

interface SearchParamsContextProps {
  searchParams: SearchParams;
  setSearchParams: (updates: Partial<SearchParams>) => void;
}

const SearchParamsContext = createContext<SearchParamsContextProps | undefined>(
  undefined,
);

export const SearchParamsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getSearchParams = useCallback(() => {
    return searchParamsSchema.parse({
      page: parseInt(searchParams.get("page") ?? defaultValues.page.toString()),
      pageSize: parseInt(
        searchParams.get("pageSize") ?? defaultValues.pageSize.toString(),
      ),
      sort: searchParams.get("sort") ?? defaultValues.sort,
      sortDirection:
        searchParams.get("sortDirection") ?? defaultValues.sortDirection,
      associatedOnly: searchParams.get("associatedOnly") === "true",
      title: searchParams.get("title") ?? defaultValues.title,
    });
  }, [searchParams]);

  const [validatedSearchParams, setValidatedSearchParams] = useState(() =>
    getSearchParams(),
  );

  const searchParamsRef = useRef(searchParams);

  useEffect(() => {
    searchParamsRef.current = searchParams;

    setValidatedSearchParams(getSearchParams());
  }, [searchParams, getSearchParams]);

  const createQueryString = useCallback(
    (updates: Partial<SearchParams>) => {
      const newParams = new URLSearchParams(searchParamsRef.current);

      Object.entries(defaultValues).forEach(([key, value]) =>
        newParams.set(key, value.toString()),
      );

      Object.entries(Object.fromEntries(searchParamsRef.current)).forEach(
        ([key, value]) => newParams.set(key, value.toString()),
      );

      Object.entries(updates).forEach(([key, value]) =>
        newParams.set(key, value.toString()),
      );

      return newParams.toString();
    },
    [searchParamsRef],
  );

  const setSearchParams = useCallback(
    (updates: Partial<SearchParams>) => {
      const newParams = createQueryString(updates);
      router.push(pathname + "?" + newParams);
    },
    [createQueryString, router, pathname],
  );

  const contextData = useMemo(
    () => ({
      searchParams: validatedSearchParams,
      setSearchParams,
    }),
    [validatedSearchParams, setSearchParams],
  );

  return (
    <SearchParamsContext.Provider value={contextData}>
      {children}
    </SearchParamsContext.Provider>
  );
};

export { SearchParamsContext };
