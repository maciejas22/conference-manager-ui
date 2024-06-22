import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import { Subtext } from "@/components/subtext";
import { Text } from "@/components/text";

import { getFormattedDateTime } from "@/utils/date";

interface NewsProps {
  title: string;
  date: string;
  content: string;
}

function News({ title, date, content }: NewsProps) {
  const formattedDate = getFormattedDateTime(date);

  return (
    <Card>
      <CardHeader className="flex gap-3">
        <div className="flex justify-between w-full ">
          <Text className="my-auto">{title}</Text>
          <Subtext>{formattedDate}</Subtext>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{content}</p>
      </CardBody>
    </Card>
  );
}

export { News };
