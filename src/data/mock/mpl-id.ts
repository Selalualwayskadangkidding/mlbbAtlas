import { calculateStandings } from "@/lib/ranking";
import type { Match, Region, Season, StandingsSnapshot, Team, Week } from "@/types/regions";

const REGION_SLUG = "mpl-id";
const SEASON_ID = "mpl-id-s14";

export const mplIdRegion: Region = {
  id: "region-mpl-id",
  name: "MPL Indonesia",
  shortName: "MPL ID",
  slug: REGION_SLUG,
  subtitle:
    "Current standings, match schedule, and team overview for Indonesia's MPL season.",
  logoSrc: "/logo/regions/LOGO_MPL-ID-NEW-2024-400.webp"
};

export const mplIdTeams: Team[] = [
  {
    id: "team-onic",
    regionSlug: REGION_SLUG,
    name: "ONIC Esports",
    slug: "onic",
    logoSrc: "/logo/teams/mpl-id/onic-b-256.png"
  },
  {
    id: "team-rrq-hoshi",
    regionSlug: REGION_SLUG,
    name: "RRQ Hoshi",
    slug: "rrq-hoshi",
    logoSrc: "/logo/teams/mpl-id/rrq-500.png"
  },
  {
    id: "team-liquid-id",
    regionSlug: REGION_SLUG,
    name: "Team Liquid ID",
    slug: "team-liquid-id",
    logoSrc: "/logo/teams/mpl-id/TLID-Primary500x500.png"
  },
  {
    id: "team-bigetron-alpha",
    regionSlug: REGION_SLUG,
    name: "Bigetron Alpha By Vit",
    slug: "bigetron-alpha",
    logoSrc: "/logo/teams/mpl-id/btr_vit.png"
  },
  {
    id: "team-evos-glory",
    regionSlug: REGION_SLUG,
    name: "EVOS Glory",
    slug: "evos-glory",
    logoSrc: "/logo/teams/mpl-id/evos-500.png"
  },
  {
    id: "team-geek-fam",
    regionSlug: REGION_SLUG,
    name: "Geek Fam",
    slug: "geek-fam",
    logoSrc: "/logo/teams/mpl-id/geek-500.png"
  },
  {
    id: "team-alter-ego",
    regionSlug: REGION_SLUG,
    name: "Alter Ego",
    slug: "alter-ego",
    logoSrc: "/logo/teams/mpl-id/ae-256.png"
  },
  {
    id: "team-navi",
    regionSlug: REGION_SLUG,
    name: "NAVI",
    slug: "navi",
    logoSrc: "/logo/teams/mpl-id/NAVI-2.png"
  },
  {
    id: "team-dewa-united",
    regionSlug: REGION_SLUG,
    name: "Dewa United Esports",
    slug: "dewa-united",
    logoSrc: "/logo/teams/mpl-id/dewa-united-500.png"
  }
];

const matchesByWeekSource: Record<number, Omit<Match, "seasonId">[]> = {
  1: [
    {
      id: "mpl-id-w1-m1",
      week: 1,
      teamASlug: "rrq-hoshi",
      teamBSlug: "dewa-united",
      teamAScore: 2,
      teamBScore: 0,
      status: "finished",
      format: "BO3",
      date: "Friday, 1 Mar",
      time: "15:00"
    },
    {
      id: "mpl-id-w1-m2",
      week: 1,
      teamASlug: "onic",
      teamBSlug: "alter-ego",
      teamAScore: 2,
      teamBScore: 1,
      status: "finished",
      format: "BO3",
      date: "Saturday, 2 Mar",
      time: "18:15"
    },
    {
      id: "mpl-id-w1-m3",
      week: 1,
      teamASlug: "evos-glory",
      teamBSlug: "geek-fam",
      teamAScore: 1,
      teamBScore: 2,
      status: "finished",
      format: "BO3",
      date: "Sunday, 3 Mar",
      time: "20:30"
    }
  ],
  2: [
    {
      id: "mpl-id-w2-m1",
      week: 2,
      teamASlug: "team-liquid-id",
      teamBSlug: "evos-glory",
      teamAScore: 2,
      teamBScore: 0,
      status: "finished",
      format: "BO3",
      date: "Friday, 8 Mar",
      time: "18:15"
    },
    {
      id: "mpl-id-w2-m2",
      week: 2,
      teamASlug: "bigetron-alpha",
      teamBSlug: "navi",
      teamAScore: 2,
      teamBScore: 1,
      status: "finished",
      format: "BO3",
      date: "Saturday, 9 Mar",
      time: "16:00"
    }
  ],
  3: [
    {
      id: "mpl-id-w3-m1",
      week: 3,
      teamASlug: "onic",
      teamBSlug: "team-liquid-id",
      teamAScore: 2,
      teamBScore: 0,
      status: "finished",
      format: "BO3",
      date: "Friday, 15 Mar",
      time: "18:15"
    },
    {
      id: "mpl-id-w3-m2",
      week: 3,
      teamASlug: "rrq-hoshi",
      teamBSlug: "geek-fam",
      teamAScore: 2,
      teamBScore: 1,
      status: "finished",
      format: "BO3",
      date: "Sunday, 17 Mar",
      time: "20:30"
    }
  ],
  4: [
    {
      id: "mpl-id-w4-m1",
      week: 4,
      teamASlug: "evos-glory",
      teamBSlug: "alter-ego",
      teamAScore: 2,
      teamBScore: 0,
      status: "finished",
      format: "BO3",
      date: "Friday, 22 Mar",
      time: "18:15"
    },
    {
      id: "mpl-id-w4-m2",
      week: 4,
      teamASlug: "bigetron-alpha",
      teamBSlug: "dewa-united",
      teamAScore: 2,
      teamBScore: 1,
      status: "finished",
      format: "BO3",
      date: "Saturday, 23 Mar",
      time: "16:00"
    }
  ],
  5: [
    {
      id: "mpl-id-w5-m1",
      week: 5,
      teamASlug: "team-liquid-id",
      teamBSlug: "rrq-hoshi",
      teamAScore: 2,
      teamBScore: 1,
      status: "finished",
      format: "BO3",
      date: "Friday, 29 Mar",
      time: "18:15"
    },
    {
      id: "mpl-id-w5-m2",
      week: 5,
      teamASlug: "navi",
      teamBSlug: "dewa-united",
      teamAScore: 2,
      teamBScore: 0,
      status: "finished",
      format: "BO3",
      date: "Sunday, 31 Mar",
      time: "15:00"
    }
  ],
  6: [
    {
      id: "mpl-id-w6-m1",
      week: 6,
      teamASlug: "onic",
      teamBSlug: "evos-glory",
      teamAScore: 2,
      teamBScore: 0,
      status: "finished",
      format: "BO3",
      date: "Friday, 12 Apr",
      time: "18:15"
    },
    {
      id: "mpl-id-w6-m2",
      week: 6,
      teamASlug: "rrq-hoshi",
      teamBSlug: "bigetron-alpha",
      teamAScore: 2,
      teamBScore: 1,
      status: "finished",
      format: "BO3",
      date: "Saturday, 13 Apr",
      time: "20:30"
    }
  ],
  7: [
    {
      id: "mpl-id-w7-m1",
      week: 7,
      teamASlug: "onic",
      teamBSlug: "rrq-hoshi",
      teamAScore: 2,
      teamBScore: 1,
      status: "finished",
      format: "BO3",
      date: "Friday, 19 Apr",
      time: "18:15"
    },
    {
      id: "mpl-id-w7-m2",
      week: 7,
      teamASlug: "team-liquid-id",
      teamBSlug: "bigetron-alpha",
      teamAScore: 2,
      teamBScore: 0,
      status: "finished",
      format: "BO3",
      date: "Saturday, 20 Apr",
      time: "16:00"
    },
    {
      id: "mpl-id-w7-m3",
      week: 7,
      teamASlug: "rrq-hoshi",
      teamBSlug: "evos-glory",
      teamAScore: null,
      teamBScore: null,
      status: "live",
      format: "BO3",
      date: "Saturday, 20 Apr",
      time: "19:00"
    },
    {
      id: "mpl-id-w7-m4",
      week: 7,
      teamASlug: "alter-ego",
      teamBSlug: "navi",
      teamAScore: null,
      teamBScore: null,
      status: "upcoming",
      format: "BO3",
      date: "Sunday, 21 Apr",
      time: "16:00"
    },
    {
      id: "mpl-id-w7-m5",
      week: 7,
      teamASlug: "dewa-united",
      teamBSlug: "onic",
      teamAScore: null,
      teamBScore: null,
      status: "upcoming",
      format: "BO3",
      date: "Sunday, 21 Apr",
      time: "20:30"
    }
  ]
};

export const mplIdMatchesByWeek: Record<number, Match[]> = Object.fromEntries(
  Object.entries(matchesByWeekSource).map(([week, matches]) => [
    Number(week),
    matches.map((match) => ({ ...match, seasonId: SEASON_ID }))
  ])
);

export const mplIdMatches: Match[] = Object.values(mplIdMatchesByWeek).flat();

function getMatchesThroughWeek(weekNumber: number) {
  return mplIdMatches.filter((match) => match.week <= weekNumber);
}

export const mplIdStandingsSnapshots: StandingsSnapshot[] = Object.keys(
  mplIdMatchesByWeek
).map((week) => {
  const weekNumber = Number(week);

  return {
    week: weekNumber,
    standings: calculateStandings(mplIdTeams, getMatchesThroughWeek(weekNumber))
  };
});

export const mplIdStandings =
  mplIdStandingsSnapshots.find((snapshot) => snapshot.week === 7)?.standings ??
  [];

const weeks: Week[] = Object.entries(mplIdMatchesByWeek).map(
  ([week, matches]) => {
    const weekNumber = Number(week);

    return {
      id: `${SEASON_ID}-week-${weekNumber}`,
      seasonId: SEASON_ID,
      weekNumber,
      label: `Week ${weekNumber}`,
      matches,
      standingsSnapshot:
        mplIdStandingsSnapshots.find((snapshot) => snapshot.week === weekNumber)
          ?.standings ?? []
    };
  }
);

export const mplIdCurrentSeason: Season = {
  id: SEASON_ID,
  regionSlug: REGION_SLUG,
  name: "Season 14",
  stage: "Regular Season",
  currentWeek: 7,
  totalMatches: 72,
  weeks
};
