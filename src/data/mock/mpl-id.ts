import type {
  Match,
  Region,
  Standing,
  StandingsSnapshot,
  Team
} from "@/types/regions";

export const mplIdRegion: Region = {
  name: "MPL Indonesia",
  shortName: "MPL ID",
  slug: "mpl-id",
  season: "Season 14",
  currentWeek: "Week 7",
  stage: "Regular Season",
  subtitle:
    "Current standings, match schedule, and team overview for Indonesia's MPL season.",
  logoSrc: "/logo/regions/LOGO_MPL-ID-NEW-2024-400.webp"
};

export const mplIdTeams: Team[] = [
  {
    name: "ONIC Esports",
    slug: "onic",
    logoSrc: "/logo/teams/mpl-id/onic-b-256.png"
  },
  {
    name: "RRQ Hoshi",
    slug: "rrq-hoshi",
    logoSrc: "/logo/teams/mpl-id/rrq-500.png"
  },
  {
    name: "Team Liquid ID",
    slug: "team-liquid-id",
    logoSrc: "/logo/teams/mpl-id/TLID-Primary500x500.png"
  },
  {
    name: "Bigetron Alpha By Vit",
    slug: "bigetron-alpha",
    logoSrc: "/logo/teams/mpl-id/btr_vit.png"
  },
  {
    name: "EVOS Glory",
    slug: "evos-glory",
    logoSrc: "/logo/teams/mpl-id/evos-500.png"
  },
  {
    name: "Geek Fam",
    slug: "geek-fam",
    logoSrc: "/logo/teams/mpl-id/geek-500.png"
  },
  {
    name: "Alter Ego",
    slug: "alter-ego",
    logoSrc: "/logo/teams/mpl-id/ae-256.png"
  },
  {
    name: "NAVI",
    slug: "navi",
    logoSrc: "/logo/teams/mpl-id/NAVI-2.png"
  },
  {
    name: "Dewa United Esports",
    slug: "dewa-united",
    logoSrc: "/logo/teams/mpl-id/dewa-united-500.png"
  }
];

export const mplIdStandings: Standing[] = [
  {
    rank: 1,
    teamSlug: "onic",
    matchRecord: "10 - 2",
    gameRecord: "22 - 7",
    gameDifference: 15,
    matchPoints: 10,
    form: ["W", "W", "L", "W", "W"],
    status: "upper-bracket"
  },
  {
    rank: 2,
    teamSlug: "rrq-hoshi",
    matchRecord: "9 - 3",
    gameRecord: "20 - 8",
    gameDifference: 12,
    matchPoints: 9,
    form: ["W", "L", "W", "W", "W"],
    status: "upper-bracket"
  },
  {
    rank: 3,
    teamSlug: "team-liquid-id",
    matchRecord: "8 - 4",
    gameRecord: "18 - 9",
    gameDifference: 9,
    matchPoints: 8,
    form: ["W", "W", "W", "L", "W"],
    status: "playoff-secured"
  },
  {
    rank: 4,
    teamSlug: "bigetron-alpha",
    matchRecord: "7 - 5",
    gameRecord: "16 - 11",
    gameDifference: 5,
    matchPoints: 7,
    form: ["L", "W", "W", "L", "W"],
    status: "playoff-secured"
  },
  {
    rank: 5,
    teamSlug: "evos-glory",
    matchRecord: "6 - 6",
    gameRecord: "14 - 13",
    gameDifference: 1,
    matchPoints: 6,
    form: ["W", "L", "L", "W", "W"],
    status: "competing"
  },
  {
    rank: 6,
    teamSlug: "geek-fam",
    matchRecord: "5 - 7",
    gameRecord: "12 - 15",
    gameDifference: -3,
    matchPoints: 5,
    form: ["L", "W", "L", "W", "L"],
    status: "competing"
  },
  {
    rank: 7,
    teamSlug: "alter-ego",
    matchRecord: "4 - 8",
    gameRecord: "10 - 17",
    gameDifference: -7,
    matchPoints: 4,
    form: ["L", "L", "W", "L", "L"],
    status: "competing"
  },
  {
    rank: 8,
    teamSlug: "navi",
    matchRecord: "3 - 9",
    gameRecord: "8 - 21",
    gameDifference: -13,
    matchPoints: 3,
    form: ["L", "L", "L", "W", "L"],
    status: "eliminated"
  },
  {
    rank: 9,
    teamSlug: "dewa-united",
    matchRecord: "2 - 10",
    gameRecord: "6 - 25",
    gameDifference: -19,
    matchPoints: 2,
    form: ["L", "L", "L", "L", "W"],
    status: "eliminated"
  }
];

const weekOneStandings: Standing[] = [
  {
    rank: 1,
    teamSlug: "rrq-hoshi",
    matchRecord: "2 - 0",
    gameRecord: "4 - 1",
    gameDifference: 3,
    matchPoints: 2,
    form: ["W", "W"],
    status: "competing"
  },
  {
    rank: 2,
    teamSlug: "onic",
    matchRecord: "2 - 0",
    gameRecord: "4 - 2",
    gameDifference: 2,
    matchPoints: 2,
    form: ["W", "W"],
    status: "competing"
  },
  {
    rank: 3,
    teamSlug: "team-liquid-id",
    matchRecord: "1 - 1",
    gameRecord: "3 - 2",
    gameDifference: 1,
    matchPoints: 1,
    form: ["W", "L"],
    status: "competing"
  },
  {
    rank: 4,
    teamSlug: "evos-glory",
    matchRecord: "1 - 1",
    gameRecord: "3 - 3",
    gameDifference: 0,
    matchPoints: 1,
    form: ["L", "W"],
    status: "competing"
  },
  {
    rank: 5,
    teamSlug: "bigetron-alpha",
    matchRecord: "1 - 1",
    gameRecord: "2 - 3",
    gameDifference: -1,
    matchPoints: 1,
    form: ["W", "L"],
    status: "competing"
  },
  {
    rank: 6,
    teamSlug: "geek-fam",
    matchRecord: "1 - 1",
    gameRecord: "2 - 3",
    gameDifference: -1,
    matchPoints: 1,
    form: ["L", "W"],
    status: "competing"
  },
  {
    rank: 7,
    teamSlug: "alter-ego",
    matchRecord: "0 - 1",
    gameRecord: "1 - 2",
    gameDifference: -1,
    matchPoints: 0,
    form: ["L"],
    status: "competing"
  },
  {
    rank: 8,
    teamSlug: "navi",
    matchRecord: "0 - 1",
    gameRecord: "0 - 2",
    gameDifference: -2,
    matchPoints: 0,
    form: ["L"],
    status: "competing"
  },
  {
    rank: 9,
    teamSlug: "dewa-united",
    matchRecord: "0 - 2",
    gameRecord: "1 - 4",
    gameDifference: -3,
    matchPoints: 0,
    form: ["L", "L"],
    status: "competing"
  }
];

const weekFourStandings: Standing[] = [
  {
    rank: 1,
    teamSlug: "onic",
    matchRecord: "6 - 1",
    gameRecord: "13 - 5",
    gameDifference: 8,
    matchPoints: 6,
    form: ["W", "W", "L", "W", "W"],
    status: "upper-bracket"
  },
  {
    rank: 2,
    teamSlug: "rrq-hoshi",
    matchRecord: "5 - 2",
    gameRecord: "12 - 6",
    gameDifference: 6,
    matchPoints: 5,
    form: ["W", "L", "W", "W", "L"],
    status: "upper-bracket"
  },
  {
    rank: 3,
    teamSlug: "team-liquid-id",
    matchRecord: "5 - 2",
    gameRecord: "11 - 7",
    gameDifference: 4,
    matchPoints: 5,
    form: ["W", "W", "W", "L", "W"],
    status: "playoff-secured"
  },
  {
    rank: 4,
    teamSlug: "bigetron-alpha",
    matchRecord: "4 - 3",
    gameRecord: "10 - 8",
    gameDifference: 2,
    matchPoints: 4,
    form: ["L", "W", "W", "L", "W"],
    status: "competing"
  },
  {
    rank: 5,
    teamSlug: "evos-glory",
    matchRecord: "3 - 4",
    gameRecord: "8 - 10",
    gameDifference: -2,
    matchPoints: 3,
    form: ["W", "L", "L", "W", "L"],
    status: "competing"
  },
  {
    rank: 6,
    teamSlug: "geek-fam",
    matchRecord: "3 - 4",
    gameRecord: "7 - 10",
    gameDifference: -3,
    matchPoints: 3,
    form: ["L", "W", "L", "W", "L"],
    status: "competing"
  },
  {
    rank: 7,
    teamSlug: "alter-ego",
    matchRecord: "2 - 5",
    gameRecord: "6 - 11",
    gameDifference: -5,
    matchPoints: 2,
    form: ["L", "L", "W", "L", "L"],
    status: "competing"
  },
  {
    rank: 8,
    teamSlug: "navi",
    matchRecord: "2 - 5",
    gameRecord: "5 - 12",
    gameDifference: -7,
    matchPoints: 2,
    form: ["L", "W", "L", "L", "L"],
    status: "competing"
  },
  {
    rank: 9,
    teamSlug: "dewa-united",
    matchRecord: "1 - 6",
    gameRecord: "4 - 13",
    gameDifference: -9,
    matchPoints: 1,
    form: ["L", "L", "L", "L", "W"],
    status: "eliminated"
  }
];

export const mplIdStandingsSnapshots: StandingsSnapshot[] = [
  { week: 1, standings: weekOneStandings },
  {
    week: 2,
    standings: weekOneStandings.map((standing) => ({
      ...standing,
      matchPoints: standing.matchPoints + (standing.rank <= 4 ? 1 : 0),
      status: "competing"
    }))
  },
  {
    week: 3,
    standings: weekOneStandings.map((standing) => ({
      ...standing,
      matchPoints: standing.matchPoints + (standing.rank <= 5 ? 2 : 1),
      status: "competing"
    }))
  },
  { week: 4, standings: weekFourStandings },
  {
    week: 5,
    standings: weekFourStandings.map((standing) => ({
      ...standing,
      matchPoints: standing.matchPoints + (standing.rank <= 6 ? 1 : 0)
    }))
  },
  {
    week: 6,
    standings: mplIdStandings.map((standing) => ({
      ...standing,
      matchPoints: Math.max(standing.matchPoints - 1, 0)
    }))
  },
  { week: 7, standings: mplIdStandings }
];

export const mplIdMatchesByWeek: Record<number, Match[]> = {
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

export const mplIdMatches: Match[] = Object.values(mplIdMatchesByWeek).flat();
