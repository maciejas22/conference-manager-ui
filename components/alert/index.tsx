import { Icon } from '@iconify/react';
import { cn } from '@nextui-org/theme';

type AlertProps = {
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
};

export function Alert({ type, title, message }: AlertProps) {
  return (
    <div
      className={cn('rounded-md p-4 text-left', {
        'bg-danger-50': type === 'error',
        'bg-warning-50': type === 'warning',
        'bg-success-50': type === 'success',
      })}
    >
      <div
        className={cn('flex', {
          'text-danger-500': type === 'error',
          'text-warning-500': type === 'warning',
          'text-success-500': type === 'success',
        })}
      >
        <div className="flex-shrink-0">
          <Icon icon="ri:close-circle-fill" className="text-lg" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">{title}</h3>
          <div className="mt-2 text-sm">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
