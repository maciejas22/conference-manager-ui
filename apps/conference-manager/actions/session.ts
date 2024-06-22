"use server";

import { cookies } from "next/headers";

import { getUser } from "./user";

const SESSION_KEY = "session";

interface Session {
  jwtToken: string;
}

async function getSession() {
  const cookieStore = cookies();
  const session = cookieStore.get(SESSION_KEY);

  return session?.value;
}

async function setSession(session: Session) {
  const cookieStore = cookies();
  cookieStore.set(SESSION_KEY, session.jwtToken);
}

async function destroySession() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_KEY);
}

async function isTokenValid() {
  return !!(await getUser());
}

export { destroySession, getSession, isTokenValid, setSession };
