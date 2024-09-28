import { Header, Subtext } from '@/components';

export function Hero() {
  return (
    <>
      <Header>
        <span className="text-primary">Seamlessly </span>Organize and Manage
        Your Conferences
      </Header>
      <Subtext>
        Elevate your conference planning experience with{' '}
        <span className="text-primary">Conference Manager</span>, the ultimate
        tool for organizers, speakers, and attendees. Whether you&apos;re
        planning a small workshop or a large-scale conference, our platform
        provides everything you need to ensure a smooth and professional event.
      </Subtext>
    </>
  );
}
