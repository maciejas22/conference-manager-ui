import { type graphql } from '@repo/libs/graphql';

type Role = ReturnType<typeof graphql.scalar<'Role'>>;

export { type Role };
