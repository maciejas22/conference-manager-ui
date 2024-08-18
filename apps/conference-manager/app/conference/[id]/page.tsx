import { ConferencePage } from '@repo/conference-management';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  return <ConferencePage params={params} />;
}
