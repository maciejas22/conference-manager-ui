import { ConferenceListPage } from '@repo/conference-management';

import { protectRoute } from '@/utils/protect-route';

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}
export default async function Page({ searchParams }: PageProps) {
  await protectRoute();
  return <ConferenceListPage searchParams={searchParams} />;
}
