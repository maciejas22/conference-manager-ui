import { NextResponse, type NextRequest } from 'next/server';

import { updateSession } from '@repo/shared/supabase/middleware';

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({
    request: req,
  });

  res = addHeaders(req, res);
  res = await updateSession(req, res);

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

const addHeaders = (req: NextRequest, res: NextResponse) => {
  const headers = new Headers(res.headers);
  headers.set('x-origin', req.nextUrl.origin);
  return NextResponse.next({
    headers,
  });
};
