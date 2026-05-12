import type { ReactNode } from "react";

import { MplIdHeader } from "@/components/regions/MplIdHeader";

interface MplIdLayoutProps {
  children: ReactNode;
}

export default function MplIdLayout({ children }: MplIdLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <MplIdHeader />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:px-10">
        {children}
      </div>
    </main>
  );
}
