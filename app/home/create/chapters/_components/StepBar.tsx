"use client";

import useMediaWindow from "@/lib/hooks/useMediaWindow";
import { motion } from "framer-motion";
import { memo } from "react";
import { Fragment } from "react/jsx-runtime";

const steps = [
  "Title",
  "Category and Keywords",
  "Cover and content",
  "Private",
];
const Container = ({
  children,
  isPhone,
}: {
  children: React.ReactNode;
  isPhone: boolean;
}) => {
  return isPhone ? (
    <Fragment>{children}</Fragment>
  ) : (
    <div className="flex flex-col relative items-center">{children}</div>
  );
};

const StepBar = memo(
  function StepBar({ step }: { step: number }) {
    console.log(step);
    const isPhone = useMediaWindow("(width < 640px)");

    return (
      <div className="flex items-center lg:flex-col   relative max-sm:overflow-hidden lg:w-10 w-full">
        {steps.map((stepString, i) => (
          <Container isPhone={isPhone} key={i}>
            <motion.button
              key={`button-${i}`}
              animate={{
                backgroundColor: step >= i ? "#7c3aed" : "#ffffff",
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="size-5 relative z-10 p-4 text-background font-bold rounded-full flex items-center justify-center border border-blue-200 shrink-0">
              {i + 1}{" "}
            </motion.button>
            {i < steps.length - 1 && (
              <motion.div className="h-2 w-full bg-background  lg:w-2 lg:h-50 border-blue-200 border lg:border-l lg:border-t-0"></motion.div>
            )}{" "}
            {!isPhone && (
              <p
                className={`absolute transition-colors left-10 w-max ${i < step ? "" : "text-foreground/50"}`}>
                {" "}
                {stepString}
              </p>
            )}
          </Container>
        ))}
        <motion.div
          style={{ height: "5px" }}
          initial={
            isPhone
              ? { width: `${(step - 1 / (steps.length - 1)) * 100}%` }
              : { height: `${(step - 1 / (steps.length - 1)) * 100}%` }
          }
          animate={
            isPhone
              ? { width: `${(step / (steps.length - 1)) * 100}%` }
              : { height: `${(step / (steps.length - 1)) * 100}%` }
          }
          className="absolute rounded-full bg-accent-text  lg:w-1 w-full "></motion.div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.step === nextProps.step,
);

export default StepBar;
