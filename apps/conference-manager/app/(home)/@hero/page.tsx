import { Header } from "../_components/header";
import { Paragraph } from "../_components/paragraph";

export default function HeroPage() {
  return (
    <>
      <Header>
        <span className="text-primary">Seamlessly </span>Organize and Manage
        Your Conferences
      </Header>
      <Paragraph>
        Elevate your conference planning experience with{" "}
        <span className="text-primary">Conference Manager</span>, the ultimate
        tool for organizers, speakers, and attendees. Whether you&apos;re
        planning a small workshop or a large-scale conference, our platform
        provides everything you need to ensure a smooth and professional event.
      </Paragraph>
    </>
  );
}
