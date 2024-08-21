import { parseAbsoluteToLocal } from '@internationalized/date';

import { Subtext, Text } from '@repo/shared/components';
import { Card, CardBody, CardHeader, Divider } from '@repo/shared/nextui';
import { getFormattedDateTime } from '@repo/shared/utils/formatters/date-formatter/index';

type NewsProps = {
  title: string;
  date: string;
  content: string;
};

function News({ title, date, content }: NewsProps) {
  const formattedDate = getFormattedDateTime(parseAbsoluteToLocal(date));

  return (
    <Card>
      <CardHeader className="info-flex gap-3">
        <div className="info-flex info-justify-between info-w-full ">
          <Text className="info-my-auto">{title}</Text>
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
