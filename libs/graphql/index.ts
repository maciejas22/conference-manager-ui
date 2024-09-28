import { initGraphQLTada } from 'gql.tada';

import { type introspection } from './types/graphql-env';

export const graphql = initGraphQLTada<{
  introspection: introspection;
  scalars: {
    ID: number;
    Time: string;
    Upload: File;
  };
}>();

export {
  readFragment,
  type FragmentOf,
  type ResultOf,
  type VariablesOf,
} from 'gql.tada';
