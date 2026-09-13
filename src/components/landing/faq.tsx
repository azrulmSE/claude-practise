import { SectionHeading } from "@/components/landing/section-heading"
import { Reveal, RevealItem } from "@/components/motion/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// TODO: placeholder answers — align w/ real plans & policies
const FAQS = [
  {
    q: "Is there a free plan?",
    a: "Yes. Starter is free for individuals, with up to 3 projects and unlimited tasks.",
  },
  {
    q: "Can I switch plans later?",
    a: "Anytime. Upgrades take effect immediately; downgrades apply at the end of your billing period.",
  },
  {
    q: "How does team billing work?",
    a: "Team is billed per active member. Paying yearly saves about 17% compared to monthly.",
  },
  {
    q: "Can I bring in work from other tools?",
    a: "Yes. You can import projects and tasks when you set up your workspace.",
  },
  {
    q: "Who can see my team's work?",
    a: "Only people you invite. Roles and permissions control who can view or edit each project.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="border-t border-border bg-muted/30 py-24">
      <Reveal className="mx-auto flex max-w-2xl flex-col gap-12 px-4 sm:px-6">
        <RevealItem>
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        </RevealItem>
        <RevealItem>
          <Accordion type="single" collapsible>
            {FAQS.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="py-4 text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealItem>
      </Reveal>
    </section>
  )
}
