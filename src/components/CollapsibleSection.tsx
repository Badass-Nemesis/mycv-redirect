'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
}

export default function CollapsibleSection({ title, children }: CollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <section className="bg-slate-200/20 rounded-xl">
            <motion.p
                onClick={toggleOpen}
                className={`cursor-pointer bg-slate-600/65 rounded-xl px-4 py-2 text-sm md:text-base font-mono font-bold md:font-semibold 
                    ${isOpen && 'rounded-b-none text-center'}`}
                initial={{ opacity: 1, width: "auto" }}
                animate={{ y: isOpen ? 0 : 10, width: isOpen ? "full" : "auto" }}
                transition={{ duration: 0.3 }}
            >
                {title}
            </motion.p>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="overflow-hidden bg-slate-500/50 m-2 p-3 rounded-xl text-sm md:text-base leading-snug font-serif font-semibold md:font-medium"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
