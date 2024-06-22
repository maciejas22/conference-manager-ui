import { cn } from '@/lib/cn';

interface HeaderProps extends React.ComponentPropsWithoutRef<'h2'> {
  children: React.ReactNode;
}

function Header({ children, className, ...props }: HeaderProps) {
  return (
    <h2
      {...props}
      className={cn('my-4', 'text-2xl', className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export { Header };
