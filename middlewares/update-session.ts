import { NextResponse, type NextRequest } from 'next/server';

import { cookiesNames } from '@/config/cookies';
import { headersNames } from '@/config/headers';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

const loginPath = '/user/login';

const updateSessionMutation = graphql(`
  mutation UpdateSession {
    updateSession
  }
`);

const updateSessionAction = () =>
  serverFetcher({ document: updateSessionMutation });

export async function updateSession(req: NextRequest) {
  const sessionId = await updateSessionAction()
    .then((data) => data.updateSession)
    .catch(() => '');

  if (!sessionId) {
    const url = req.nextUrl.clone();
    url.pathname = loginPath;
    return NextResponse.redirect(url);
  }

  req.headers.set(headersNames.isUserAuthenticated, 'true');
  req.cookies.set(cookiesNames.sessionId, sessionId);
  return req;
}
