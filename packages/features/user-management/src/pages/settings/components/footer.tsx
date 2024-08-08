import React from 'react';

interface FooterProps {
  children: JSX.Element;
}

export function Footer({ children }: FooterProps) {
  return (
    <footer className="um-flex um-justify-end um-px-8 um-py-4 um-fixed um-bottom-0 um-left-0 um-w-full um-border-t-[1px] um-border-zinc-900">
      {children}
    </footer>
  );
}
