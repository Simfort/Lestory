"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { Fragment } from "react/jsx-runtime";

const steps = ["title", "CaK", "cover and conternt", "private"];

const StepBar = memo(
  function StepBar({ step }: { step: number }) {
    console.log(step);
    return (
      <div className="flex items-center   overflow-hidden relative ">
        {steps.map((stepString, i) => (
          <Fragment key={i}>
            <motion.button
              initial={
                step > i ? { background: "#ffffff" } : { background: "#fee685" }
              }
              animate={
                step > i ? { background: "#fee685" } : { background: "#ffffff" }
              }
              className={`size-5 relative z-10 p-4 text-blue-900  font-bold  rounded-full flex items-center justify-center border border-blue-200 shrink-0`}>
              {i + 1}{" "}
            </motion.button>
            {i < steps.length - 1 && (
              <motion.div className="h-2 w-full  border-blue-200 border ">
                {" "}
              </motion.div>
            )}
          </Fragment>
        ))}{" "}
        <motion.div
          initial={{ width: `${(step - 1 / (steps.length - 1)) * 100}%` }}
          animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          className="absolute rounded-full h-1 bg-linear-to-r from-amber-200 via-pink-500 to-amber-200 w-full"></motion.div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.step === nextProps.step,
);
export default StepBar;
