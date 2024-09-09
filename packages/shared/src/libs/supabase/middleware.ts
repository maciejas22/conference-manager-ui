import { NextResponse, type NextRequest } from 'next/server';

import { createServerClient } from '@supabase/ssr';

import { env } from '@repo/config/env/server';

const isPathWhitelisted = (path: string, whiteList: string[]) =>
  whiteList.some((item) => path.startsWith(item));

export async function updateSession(
  request: NextRequest,
  supabaseResponse: NextResponse,
  whitelist: string[],
  loginPath?: string,
) {
  const supabase = createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isPathWhitelisted(request.nextUrl.pathname, whitelist)) {
    const url = request.nextUrl.clone();
    url.pathname = loginPath ?? '/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
