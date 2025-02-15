import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24 px-4 md:px-24">
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
            <AccordionTrigger>What features do I get on Pro</AccordionTrigger>
            <AccordionContent>
              You can get give your board access to filtering, fonts, different
              data indexing methods, and mobile leaderboards. Plus you will get
              access to many more smaller features and updates that we
              constantly release. You can request new features too!
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
              How long does it to make my board?
            </AccordionTrigger>
            <AccordionContent>
              Building the board can take about 5 minutes. All you have to do is
              style the board to your liking and add you data urls or api keys.
              Plus, you can try Competiboard for free to see how your own board
              will look!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What url will my board be on?</AccordionTrigger>
            <AccordionContent>
              Your board will be hosted on competiboard.com/'yourBusinessName'.
              Claim your url before someone else does!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
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
