import { CallToAction, Features, Hero } from './sections';

export default function HomePage() {
  return (
    <article className="max-w-2xl m-auto text-center">
      <section className="h-screen flex flex-col justify-center">
        <Hero />
      </section>
      <section className="py-32 space-y-8">
        <CallToAction />
      </section>
      <section className="py-32 space-y-8">
        <Features />
      </section>
    </article>
  );
}
