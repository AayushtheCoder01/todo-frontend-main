import { motion } from "framer-motion";
import React from "react";
import { GoArrowRight } from "react-icons/go";
import { AuroraBackground } from "../ui/aurora-background";
import "./components.css"
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginAtom } from "./Store/store";
 
export default function Background() {
  const isLoggedIN = useRecoilValue(loginAtom)
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Manage your all Todos with ease.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Productive, Simple and Asthetic  User Interface. 
        </div>
        {isLoggedIN? <NavLink to={"/dashboard"}>
          <button className="bg-btn  rounded-full w-fit  px-4 py-2">
          <div className="flex inline-block">
            <span>Go to Dashboard</span>
            <span className="mt-[.75vh] ml-1"><GoArrowRight /></span>
          </div>
           
        </button>
        </NavLink> : 
        <NavLink to={"/login"}>
          <button className="bg-btn  rounded-full w-fit  px-4 py-2">
          <div className="flex inline-block">
            <span>Get Started</span>
            <span className="mt-[.75vh] ml-1"><GoArrowRight /></span>
          </div>
           
        </button>
        </NavLink>
}
        
      </motion.div>
    </AuroraBackground>
  );
}