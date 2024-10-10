import React from 'react';

type FooterProps = {
  children: React.ReactNode;
};

export function Footer({ children }: FooterProps) {
  return (
    <footer className="fixed bottom-0 right-0 z-40 flex h-16 w-navbar items-center justify-end border-t border-zinc-900 bg-black px-7">
      {children}
    </footer>
  );
}
