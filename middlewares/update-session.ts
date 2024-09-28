import { NextResponse, type NextRequest } from 'next/server';

import { publicRoutes } from '@/config/public-routes';
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

const isPathWhitelisted = (path: string, whiteList: string[]) =>
  whiteList.some((item) => path.startsWith(item));

export async function updateSession(req: NextRequest, res: NextResponse) {
  const pathname = req.nextUrl.pathname;

  const sessionId = await updateSessionAction()
    .then((data) => data.updateSession)
    .catch(() => '');
  res.cookies.set('session', sessionId);

  if (!sessionId && !isPathWhitelisted(pathname, publicRoutes)) {
    const url = req.nextUrl.clone();
    url.pathname = loginPath;
    return NextResponse.redirect(url);
  }

  return res;
}
