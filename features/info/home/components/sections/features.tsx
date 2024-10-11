import { Icon } from '@iconify/react';

import { Card } from '@/components/card';
import { Header } from '@/components/header';
import { Subtext } from '@/components/subtext';

const features = [
  {
    id: 'effortless-registration',
    title: 'Effortless Registration',
    description:
      'Simplify the registartion process for your attendees with our easy-to-use registration form.',
    icon: 'ri:computer-line',
  },
  {
    id: 'agenda-planning',
    title: 'Agenda Planning',
    description:
      'Create and manage your conference agenda with our intuitive agenda planning tool.',
    icon: 'ri:pie-chart-line',
  },
  {
    id: 'advanced-security',
    title: 'Advanced Security',
    description:
      'Protect your conference data with our advanced security features.',
    icon: 'ri:fingerprint-line',
  },
  {
    id: 'beautiful-design',
    title: 'Beautiful Design',
    description:
      'Impress your attendees with our beautiful and modern conference website templates.',
    icon: 'ri:brush-line',
  },
];

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card
      header={
        <>
          <Icon icon={icon} className="h-6 w-6 text-primary" />
          <p>{title}</p>
        </>
      }
    >
      {description}
    </Card>
  );
}

export function Features() {
  return (
    <>
      <Header>
        Everything you need to plan a{' '}
        <span className="text-primary">successful</span> conference
      </Header>
      <Subtext>
        Use Conference Manager to plan and manage your conference with ease. Our
        platform provides all the tools you need to ensure a smooth and
        professional event.
      </Subtext>
      <div className="grid grid-cols-2 gap-8">
        {features.map((feature) => (
          <FeatureCard key={feature.id} {...feature} />
        ))}
      </div>
    </>
  );
}
