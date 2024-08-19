import { type graphql } from '@repo/shared/graphql';

type Role = ReturnType<typeof graphql.scalar<'Role'>>;

export { type Role };
