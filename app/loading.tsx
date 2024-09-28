import { Spinner } from '@nextui-org/spinner';

export default function Loading() {
  return (
    <div className="h-full w-full">
      <Spinner
        color="primary"
        label="Loading..."
        classNames={{
          base: 'w-full',
        }}
      />
    </div>
  );
}
