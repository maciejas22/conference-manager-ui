import { NextResponse, type NextRequest } from 'next/server';

import { sessionIdCookie } from '@/config/session';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/server-fetcher';

const loginPath = '/user/login';

const updateSessionMutation = graphql(`
  mutation UpdateSession {
    updateSession
  }
`);

const updateSessionAction = () =>
  serverFetcher({ document: updateSessionMutation });

export async function updateSession(req: NextRequest, res: NextResponse) {
  const sessionId = await updateSessionAction()
    .then((data) => data.updateSession)
    .catch(() => '');
  res.cookies.set(sessionIdCookie, sessionId);

  if (!sessionId) {
    const url = req.nextUrl.clone();
    url.pathname = loginPath;
    return NextResponse.redirect(url);
  }

  return res;
}
