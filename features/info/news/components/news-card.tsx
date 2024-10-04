import { parseAbsoluteToLocal } from '@internationalized/date';
import { Divider } from '@nextui-org/divider';

import { Card } from '@/components/card';
import { Subtext } from '@/components/subtext';
import { Text } from '@/components/text';
import { getFormattedDateTime } from '@/utils/formatters/date-formatter';

type NewsProps = {
  title: string;
  date: string;
  content: string;
};

export function News({ title, date, content }: NewsProps) {
  const formattedDate = getFormattedDateTime(parseAbsoluteToLocal(date));

  return (
    <Card
      header={
        <div className="flex justify-between w-full ">
          <Text className="my-auto">{title}</Text>
          <Subtext>{formattedDate}</Subtext>
        </div>
      }
    >
      <Divider />
      <p>{content}</p>
    </Card>
  );
}
