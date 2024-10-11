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
    '/((?!_next/static|_next/image|favicon.ico|.*(?:svg|png|jpg|jpeg|gif|webp)$|user/login|user/sign-up).*)',
  ],
};
