import { CallToAction, Features, Hero } from '@/features/info/home';

export default function HomePage() {
  return (
    <article className="m-auto max-w-2xl text-center">
      <section className="flex h-screen flex-col justify-center">
        <Hero />
      </section>
      <section className="space-y-8 py-32">
        <CallToAction />
      </section>
      <section className="space-y-8 py-32">
        <Features />
      </section>
    </article>
  );
}
