export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-mt-10 sm:main-mx-auto sm:main-w-full sm:main-max-w-sm">
      {children}
    </div>
  );
}
