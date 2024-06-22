import {
  ComputerDesktopIcon,
  FingerPrintIcon,
  PencilIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { Header } from "../_components/header";
import { Paragraph } from "../_components/paragraph";

const features = [
  {
    title: "Effortless Registration",
    description:
      "Simplify the registartion process for your attendees with our easy-to-use registration form.",
    icon: PencilIcon,
  },
  {
    title: "Agenda Planning",
    description:
      "Create and manage your conference agenda with our intuitive agenda planning tool.",
    icon: PresentationChartBarIcon,
  },
  {
    title: "Advanced Security",
    description:
      "Protect your conference data with our advanced security features.",
    icon: FingerPrintIcon,
  },
  {
    title: "Beautiful Design",
    description:
      "Impress your attendees with our beautiful and modern conference website templates.",
    icon: ComputerDesktopIcon,
  },
];

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <Card>
      <CardHeader className="space-x-2">
        <Icon className="w-6 h-6 text-primary" />
        <p>{title}</p>
      </CardHeader>
      <CardBody>{description}</CardBody>
    </Card>
  );
};

export default function Features() {
  return (
    <>
      <Header>
        Everything you need to plan a{" "}
        <span className="text-primary">successful</span> conference
      </Header>
      <Paragraph>
        Use Conference Manager to plan and manage your conference with ease. Our
        platform provides all the tools you need to ensure a smooth and
        professional event.
      </Paragraph>
      <div className="grid grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </>
  );
}
