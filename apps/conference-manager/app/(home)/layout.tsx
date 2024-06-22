interface LayoutProps {
  cta: React.ReactNode;
  features: React.ReactNode;
  hero: React.ReactNode;
}

export default function Layout({ cta, features, hero }: LayoutProps) {
  const sections = [cta, features];

  return (
    <article className="max-w-2xl m-auto text-center">
      <section className="h-screen flex flex-col justify-center">
        {hero}
      </section>
      {sections.map((section, index) => (
        <section key={index} className="py-32 space-y-8">
          {section}
        </section>
      ))}
    </article>
  );
}
