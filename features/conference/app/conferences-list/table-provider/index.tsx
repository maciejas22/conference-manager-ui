'use client';

import {
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { type SortDescriptor } from '@nextui-org/table';
import { useQuery } from '@tanstack/react-query';

import { useDebounce } from '@/hooks/use-debounce';

import { getConferences } from '../actions';
import { GetConferencesQueryResponse } from '../actions/query';
import { ColumnKey } from '../types/column';
import { TableConfig } from '../types/table-config';
import { queryVars } from '../utils/query-vars';

type TableContextProps = {
  defaultTableConfig: TableConfig;
  children: ReactNode;
};

type TableContextState = {
  isPending: boolean;
  tableConfig: TableConfig;
  updateTableConfig: <K extends keyof TableConfig>(
    key: K,
    value: Partial<TableConfig[K]>,
  ) => void;
  handleSortChange: (descriptor: SortDescriptor) => void;
  conferences: GetConferencesQueryResponse['data'];
  conferencesMetaData: GetConferencesQueryResponse['meta'];
};

const TableContext = createContext<TableContextState | undefined>(undefined);

function TableProvider({ defaultTableConfig, children }: TableContextProps) {
  const [tableConfig, setTableConfig] =
    useState<TableConfig>(defaultTableConfig);
  const deboundedTitle = useDebounce(tableConfig.filters.title, 500);

  const conferencesQueryVars = useMemo(
    () =>
      queryVars({
        ...tableConfig,
        filters: { ...tableConfig.filters, title: deboundedTitle },
      }),
    [tableConfig, deboundedTitle],
  );
  const { data, isLoading } = useQuery({
    queryKey: ['conferences', conferencesQueryVars],
    queryFn: () => getConferences(conferencesQueryVars),
  });

  const updateTableConfig = useCallback(
    <K extends keyof TableConfig>(key: K, value: Partial<TableConfig[K]>) => {
      setTableConfig((prevConfig) => ({
        ...prevConfig,
        [key]: value,
      }));
    },
    [],
  );

  const handleSortChange = useCallback(
    (descriptor: SortDescriptor) => {
      const columnField = descriptor.column
        ? (descriptor.column as ColumnKey)
        : defaultTableConfig.sort.column;
      const newDirection =
        columnField === tableConfig.sort.column &&
        tableConfig.sort.order === 'ascending'
          ? 'descending'
          : 'ascending';

      setTableConfig((prevTableConfig) => ({
        ...prevTableConfig,
        sort: {
          column: columnField,
          order: newDirection,
        },
      }));
    },
    [tableConfig.sort],
  );

  const contextData = useMemo<TableContextState>(
    () => ({
      isPending: isLoading,
      tableConfig,
      updateTableConfig,
      handleSortChange,
      conferences: data?.conferences?.data ?? [],
      conferencesMetaData: data?.conferences?.meta ?? {
        page: {
          totalItems: 0,
          totalPages: 0,
        },
      },
    }),
    [tableConfig, data, handleSortChange, updateTableConfig, isLoading],
  );

  return (
    <TableContext.Provider value={contextData}>
      {children}
    </TableContext.Provider>
  );
}

const useTableContext = () => {
  const context = use(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};

export { TableContext, TableProvider, useTableContext };
