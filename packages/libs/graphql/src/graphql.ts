import { initGraphQLTada } from 'gql.tada';
import { type introspection } from '../src/types/graphql-env';

export const graphql = initGraphQLTada<{
  introspection: introspection;
  scalars: {
    Time: string;
  };
}>();

export {
  readFragment,
  type FragmentOf,
  type ResultOf,
  type VariablesOf,
} from 'gql.tada';
