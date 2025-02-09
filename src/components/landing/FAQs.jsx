import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  return (
    <div className="min-h-screen pt-32 pb-8 px-4 md:px-24">
      <h1 className="text-7xl font-euclid text-center font-semibold mb-12">
        FAQs<span className="text-red-500">.</span>
      </h1>

      <div className="font-dm">
        <Accordion
          type="single"
          collapsible
          className="w-5/6 md:w-1/2 mx-auto font-dm h-80"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Fill FAQs up Later</AccordionTrigger>
            <AccordionContent>
              Trust us, going through the headaches of fufillment, chargebacks,
              refunds, and more are not worth it for a few sales. Make sure the
              product's a winner before accepting money. Plus, emailing those
              who completed checkout to buy again later has above an 85%
              conversion rate for our current users.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I get a refund?</AccordionTrigger>
            <AccordionContent>
              Yes. We offer refunds and no questions asked.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How long does it take to launch a drop?
            </AccordionTrigger>
            <AccordionContent>
              Building the drop can take about 10 minutes if you have all the
              product images ready to go. Launching it takes no effort or time
              either, just depends on how long your domain provider takes to
              connect your domain.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How do I contact you?</AccordionTrigger>
            <AccordionContent>
              Contact us at founder's email: byjuaditya@gmail.com
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
