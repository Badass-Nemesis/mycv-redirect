'use client'

import { useState } from "react";

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
}

export default function CollapsibleSection({ title, children }: CollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <section>
            <p onClick={toggleOpen} className="cursor-pointer bg-slate-200/65 rounded-xl px-4 py-2">{title}</p>
            {isOpen && <div className="bg-slate-100/50 m-2 p-3 rounded-xl">{children}</div>}
        </section>
    );
}