export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">{children}</div>
  );
}
