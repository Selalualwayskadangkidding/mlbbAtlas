export interface RegionSummary {
  name: string;
  shortName: string;
  country: string;
  status: string;
  teams: number;
  leader: string;
  record: string;
  colors: string[];
  accentClass: string;
  textAccentClass: string;
  recordClass: string;
  mark: string;
}

export interface FeaturedMatch {
  region: string;
  week: string;
  date: string;
  time: string;
  teamA: string;
  teamB: string;
  stage: string;
}

export interface Highlight {
  label: string;
  value: string;
  detail: string;
}
