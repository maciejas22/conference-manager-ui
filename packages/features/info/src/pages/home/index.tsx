import { CallToAction, Features, Hero } from './sections';

export function HomePage() {
  return (
    <article className="info-max-w-2xl info-m-auto info-text-center">
      <section className="info-h-screen info-flex info-flex-col info-justify-center">
        <Hero />
      </section>
      <section className="info-py-32 info-space-y-8">
        <CallToAction />
      </section>
      <section className="info-py-32 info-space-y-8">
        <Features />
      </section>
    </article>
  );
}
