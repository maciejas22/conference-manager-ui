import { NextResponse, type NextRequest } from 'next/server';

import { updateSession } from './middlewares';

type MiddlewareResponse =
  | NextRequest
  | NextResponse
  | Promise<NextRequest | NextResponse>;
type Middleware = (req: NextRequest) => MiddlewareResponse;

const chainMiddlewares = async (
  req: NextRequest,
  ...middlewares: Middleware[]
) => {
  let currentReq: MiddlewareResponse = req;

  for (const middleware of middlewares) {
    currentReq = await middleware(currentReq);

    if (currentReq instanceof NextResponse) {
      return currentReq;
    }
  }

  return NextResponse.next({
    request: currentReq,
  });
};

export async function middleware(req: NextRequest) {
  return chainMiddlewares(req, updateSession);
}

export const config = {
  matcher: [
    '/',
    '/conference/:path*',
    '/news/:path*',
    '/terms/:path*',
    '/user/settings/:path*',
  ],
};
