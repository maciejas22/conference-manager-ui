import { updateSession } from '@repo/libs/supabase';
import { type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  return await updateSession(req);
  // const isTokenOK = await isTokenValid();
  // if (!isTokenOK && !req.nextUrl.pathname.startsWith('/auth')) {
  //   const res = NextResponse.redirect(new URL('/auth/login', req.url));
  //   res.cookies.delete('session');
  //   return res;
  // }
  //
  // return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
