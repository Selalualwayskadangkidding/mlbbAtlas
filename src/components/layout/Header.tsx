const navigationItems = ["Home", "Regions", "Schedule", "Stats", "Teams"];

interface HeaderNavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface HeaderProps {
  logoOnly?: boolean;
  variant?: "dark" | "light";
  navItems?: HeaderNavItem[];
  showActions?: boolean;
}

export function Header({
  logoOnly = false,
  variant = "dark",
  navItems,
  showActions = true
}: HeaderProps) {
  const isLight = variant === "light";
  const resolvedNavItems =
    navItems ??
    navigationItems.map((item) => ({
      label: item,
      href: item === "Regions" ? "#regions" : "#",
      active: false
    }));

  return (
    <header
      className={
        isLight
          ? "border-b border-slate-200 bg-white/80 backdrop-blur"
          : "border-b border-atlas-border/70 bg-atlas-background/80 backdrop-blur"
      }
    >
      <div className="mx-auto flex h-[74px] w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a className="flex items-center gap-3" href="/">
          <span className="grid h-8 w-8 place-items-center text-lg font-black text-atlas-accent">
            A
          </span>
          <span
            className={
              isLight
                ? "text-base font-black tracking-wide text-slate-950"
                : "text-base font-black tracking-wide"
            }
          >
            MLBB<span className="text-atlas-accent">ATLAS</span>
          </span>
        </a>
        {!logoOnly ? (
          <>
            <nav className="hidden h-full items-center gap-7 text-sm font-medium uppercase tracking-[0.12em] text-atlas-secondary md:flex">
              {resolvedNavItems.map((item) => (
                <a
                  className={
                    item.active
                      ? isLight
                        ? "flex h-full items-center border-b border-atlas-accent text-slate-950 transition"
                        : "flex h-full items-center border-b border-atlas-accent text-atlas-primary transition hover:text-atlas-primary"
                      : isLight
                        ? "flex h-full items-center border-b border-transparent text-slate-500 transition hover:border-atlas-accent hover:text-slate-950"
                        : "flex h-full items-center border-b border-transparent transition hover:border-atlas-accent hover:text-atlas-primary"
                  }
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            {showActions ? (
              <div className="hidden items-center gap-3 sm:flex">
              <span className="rounded-md border border-atlas-accent/50 bg-atlas-surface px-4 py-2 text-sm font-semibold text-blue-300">
                S14
              </span>
              <a
                className="rounded-md border border-atlas-accent/70 bg-blue-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-blue-300 transition hover:bg-blue-500/20"
                href="#matches"
              >
                Watch live
              </a>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </header>
  );
}
