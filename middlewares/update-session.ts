import { NextResponse, type NextRequest } from 'next/server';

import { cookiesNames } from '@/config/cookies';
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
  const { updateSession: sessionId } = await updateSessionAction()
    .then((data) => data)
    .catch(() => ({ updateSession: '' }));

  if (!sessionId) {
    const url = req.nextUrl.clone();
    url.pathname = loginPath;
    return NextResponse.redirect(url);
  }

  req.cookies.set(cookiesNames.sessionId, sessionId);
  return req;
}
