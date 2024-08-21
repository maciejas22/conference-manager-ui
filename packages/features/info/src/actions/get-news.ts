'use server';

import { cache } from 'react';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { getNewsQuery } from '#graphql/get-news';

export const getNews = cache(() => serverFetcher({ document: getNewsQuery }));
