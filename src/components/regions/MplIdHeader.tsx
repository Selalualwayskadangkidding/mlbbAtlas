"use client";

import { usePathname } from "next/navigation";

import { Header } from "@/components/layout/Header";

const navItems = [
  { label: "Overview", href: "/regions/mpl-id" },
  { label: "Teams", href: "/regions/mpl-id/teams" },
  { label: "Schedule", href: "/regions/mpl-id/schedule" },
  { label: "Statistics", href: "/regions/mpl-id/statistics" },
  { label: "Journey", href: "/regions/mpl-id/journey" },
  { label: "Simulator", href: "/regions/mpl-id/simulator" }
];

export function MplIdHeader() {
  const pathname = usePathname();

  return (
    <Header
      variant="light"
      navItems={navItems.map((item) => ({
        ...item,
        active:
          item.href === "/regions/mpl-id"
            ? pathname === item.href
            : pathname.startsWith(item.href)
      }))}
      showActions={false}
    />
  );
}
