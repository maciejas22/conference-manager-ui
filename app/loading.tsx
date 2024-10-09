import { Spinner } from '@nextui-org/spinner';

export default function Loading() {
  return (
    <div className="h-full w-full">
      <Spinner
        size="lg"
        color="primary"
        label="Loading..."
        classNames={{
          base: 'w-full',
        }}
      />
    </div>
  );
}
