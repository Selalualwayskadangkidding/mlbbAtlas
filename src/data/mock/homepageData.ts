import type { FeaturedMatch, Highlight, RegionSummary } from "@/types";

export const regions: RegionSummary[] = [
  {
    name: "MPL Indonesia",
    shortName: "ID",
    country: "Indonesia",
    status: "Week 7",
    teams: 9,
    leader: "ONIC Esports",
    record: "6W - 0L",
    colors: ["#FFD700", "#000000"],
    accentClass: "border-t-red-500",
    textAccentClass: "text-red-400",
    recordClass: "border-red-500/70 bg-red-500/10 text-red-300",
    mark: "ON"
  },
  {
    name: "MPL Philippines",
    shortName: "PH",
    country: "Philippines",
    status: "Week 7",
    teams: 8,
    leader: "Blacklist Intl.",
    record: "5W - 1L",
    colors: ["#000000", "#FFFFFF"],
    accentClass: "border-t-blue-500",
    textAccentClass: "text-blue-400",
    recordClass: "border-blue-500/70 bg-blue-500/10 text-blue-300",
    mark: "BL"
  },
  {
    name: "MPL Malaysia",
    shortName: "MY",
    country: "Malaysia",
    status: "Week 6",
    teams: 10,
    leader: "Selangor Red Giants",
    record: "4W - 2L",
    colors: ["#FF0000", "#FFD700"],
    accentClass: "border-t-yellow-400",
    textAccentClass: "text-yellow-300",
    recordClass: "border-yellow-400/70 bg-yellow-400/10 text-yellow-200",
    mark: "AE"
  },
  {
    name: "MPL Singapore",
    shortName: "SG",
    country: "Singapore",
    status: "Week 7",
    teams: 8,
    leader: "Team Flash",
    record: "4W - 2L",
    colors: ["#FFCC00", "#000000"],
    accentClass: "border-t-pink-500",
    textAccentClass: "text-pink-400",
    recordClass: "border-pink-500/70 bg-pink-500/10 text-pink-300",
    mark: "SM"
  },
  {
    name: "MPL Cambodia",
    shortName: "KH",
    country: "Cambodia",
    status: "Week 7",
    teams: 8,
    leader: "See You Soon",
    record: "5W - 1L",
    colors: ["#000000", "#FFD700"],
    accentClass: "border-t-violet-500",
    textAccentClass: "text-violet-400",
    recordClass: "border-violet-500/70 bg-violet-500/10 text-violet-300",
    mark: "BX"
  }
];

export const featuredMatches: FeaturedMatch[] = [
  {
    region: "MPL Indonesia",
    week: "Week 6",
    date: "Fri, 19 Apr",
    time: "18:15",
    teamA: "ONIC",
    teamB: "RRQ",
    stage: "Regular season"
  },
  {
    region: "MPL Philippines",
    week: "Week 5",
    date: "Sat, 20 Apr",
    time: "16:00",
    teamA: "Falcons AP.Bren",
    teamB: "Blacklist",
    stage: "Regular season"
  },
  {
    region: "MPL Malaysia",
    week: "Week 4",
    date: "Sun, 21 Apr",
    time: "20:30",
    teamA: "Selangor Red Giants",
    teamB: "HomeBois",
    stage: "Regular season"
  }
];

export const highlights: Highlight[] = [
  {
    label: "Tracked regions",
    value: "5",
    detail: "SEA MPL leagues in one global view"
  },
  {
    label: "Featured series",
    value: "12",
    detail: "Upcoming matches across current weeks"
  },
  {
    label: "Playoff watch",
    value: "8",
    detail: "Teams near upper bracket or elimination lines"
  }
];
