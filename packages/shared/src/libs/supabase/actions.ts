'use server';

import { cache } from 'react';

import { createClient } from './server-client';

export const logout = async () => await createClient().auth.signOut();

export const getSupabaseUser = cache(
  async () => await createClient().auth.getUser(),
);

export const getSupabaseSession = cache(
  async () => await createClient().auth.getSession(),
);
