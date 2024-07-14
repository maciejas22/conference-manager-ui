import { ConferencePage } from '@repo/conference-management';

import { protectRoute } from '@/utils/protect-route';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  await protectRoute();
  return <ConferencePage params={params} />;
}
