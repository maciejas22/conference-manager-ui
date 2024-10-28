import { redirect } from 'next/navigation';

import { publicEnv } from '@/config/env';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

const getAccountLinkMutation = graphql(`
  mutation GetAccontLink($returnUrl: String!, $refreshUrl: String!) {
    stripeOnboard(returnUrl: $returnUrl, refreshUrl: $refreshUrl)
  }
`);

export default async function StripeRefreshPage({
  params,
}: {
  params: { id: string };
}) {
  const accountLink = await serverFetcher({
    document: getAccountLinkMutation,
    variables: {
      returnUrl: `${publicEnv.uiBaseUrl}/user/stripe`,
      refreshUrl: `${publicEnv.apiBaseUrl}/api/stripe/${params.id}/refresh`,
    },
  });

  redirect(accountLink.stripeOnboard);
}
