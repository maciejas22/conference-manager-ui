'use client';

import { Accordion, AccordionItem } from '@repo/shared/nextui';

type Section = {
  id: string;
  title: string | null;
  content: string | null;
  subsections: {
    id: string;
    title: string | null;
    content: string | null;
  }[];
};

type TermsAccordionProps = {
  termsConent: Section[];
};

function formatContent(content: string | null) {
  return content?.split('\\n').map((line) => (
    <span key={line}>
      {line}
      <br />
    </span>
  ));
}

function TermsAccordion({ termsConent }: TermsAccordionProps) {
  return (
    <Accordion variant="splitted" className="px-0">
      {termsConent.map((section, sectionId) => (
        <AccordionItem
          key={section.id}
          title={
            section.title ? `${String(sectionId + 1)}. ${section.title}` : null
          }
        >
          {Boolean(section.content) && <p>{formatContent(section.content)}</p>}
          {section.subsections.map((subsection, subsectionId) => (
            <div key={subsection.id} className="info-my-2">
              {subsection.title ? (
                <h3 className="info-my-2 info-text-lg">{`${String(sectionId + 1)}.${String(subsectionId + 1)}. ${subsection.title}`}</h3>
              ) : null}
              {Boolean(subsection.content) && (
                <p>{formatContent(subsection.content)}</p>
              )}
            </div>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export { TermsAccordion };
