import React from 'react';

type FooterProps = {
  children: React.ReactNode;
};

export function Footer({ children }: FooterProps) {
  return (
    <footer className="z-40 w-navbar h-16 bg-black flex justify-end px-7 items-center fixed bottom-0 right-0 border-t border-zinc-900">
      {children}
    </footer>
  );
}
