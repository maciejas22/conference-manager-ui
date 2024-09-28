'use client';

import { Paper } from '@/components';

import { Filters } from './filters';
import { SearchBar } from './search-bar';
import { VisibleColumnsSelect } from './visible-columns-select';

type TopContentSettings = {
  isInputVisible?: boolean;
  isVisibleColumnsSelectVisible?: boolean;
  areFiletrsVisible?: boolean;
};

type TopContentProps = {
  settings?: TopContentSettings;
};

function TopContent({ settings = {} }: TopContentProps) {
  const {
    isInputVisible = true,
    isVisibleColumnsSelectVisible = true,
    areFiletrsVisible = true,
  } = settings;

  return (
    <Paper>
      <div className="flex w-full gap-4">
        {isInputVisible && <SearchBar />}
        {isVisibleColumnsSelectVisible && <VisibleColumnsSelect />}
        {areFiletrsVisible && <Filters />}
      </div>
    </Paper>
  );
}

export { TopContent };
