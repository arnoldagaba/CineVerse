import type { ReactNode } from "react";

export const MovieGrid = ({ children }: { children: ReactNode }) => (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {children}
    </section>
);