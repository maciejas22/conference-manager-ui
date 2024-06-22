"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";

import { Section } from "@/graphql/__types__/types";

interface TermsAccordionProps {
  termsConent: Section[];
}

function formatContent(content: string) {
  return content.split("\\n").map((line, index) => (
    <span key={index}>
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
          key={sectionId}
          title={`${sectionId + 1}. ${section.title}`}
        >
          {section.content && <p>{formatContent(section.content)}</p>}
          {section.subsections?.map((subsection, subsectionId) => (
            <div key={subsectionId} className="my-2">
              <h3 className="my-2 text-lg">{`${sectionId + 1}.${subsectionId + 1}. ${subsection.title}`}</h3>
              {subsection.content && <p>{formatContent(subsection.content)}</p>}
            </div>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export { TermsAccordion };
