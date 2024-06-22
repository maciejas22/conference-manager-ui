function Header({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-center text-2xl leading-9 text-primary">{children}</h1>
  );
}

export { Header };
