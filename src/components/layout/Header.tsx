const navigationItems = ["Home", "Regions", "Schedule", "Stats", "Teams"];

interface HeaderProps {
  logoOnly?: boolean;
  variant?: "dark" | "light";
}

export function Header({ logoOnly = false, variant = "dark" }: HeaderProps) {
  const isLight = variant === "light";

  return (
    <header
      className={
        isLight
          ? "border-b border-slate-200 bg-white/80 backdrop-blur"
          : "border-b border-atlas-border/70 bg-atlas-background/80 backdrop-blur"
      }
    >
      <div className="mx-auto flex h-[74px] w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a className="flex items-center gap-3" href="#">
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
            <nav className="hidden h-full items-center gap-9 text-sm font-medium uppercase tracking-[0.12em] text-atlas-secondary md:flex">
              {navigationItems.map((item) => (
                <a
                  className="flex h-full items-center border-b border-transparent transition hover:border-atlas-accent hover:text-atlas-primary"
                  href={item === "Regions" ? "#regions" : "#"}
                  key={item}
                >
                  {item}
                </a>
              ))}
            </nav>
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
          </>
        ) : null}
      </div>
    </header>
  );
}
