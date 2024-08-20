import { NextResponse, type NextRequest } from 'next/server';

import { updateSession } from '@repo/shared/supabase/middleware';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({
    request: req,
  });

  return await updateSession(req, res);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
