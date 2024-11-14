export interface Prop {
  playerName: string;
  playerId: number;
  teamId: number;
  teamNickname: string;
  teamAbbr: string;
  statType: string;
  statTypeId: number;
  position: string;
  marketSuspended: number;
  line: number;
}

export interface Alternate {
  playerName: string;
  playerId: number;
  statType: string;
  statTypeId: number;
  line: number;
  underOdds: number;
  overOdds: number;
  pushOdds: number;
}

export interface Market extends Prop {
  lowLine: number | null;
  highLine: number | null;
  isSuspended: boolean;
}

export interface Filters {
  position: string;
  statType: string;
  marketStatus: string;
  searchTerm: string;
}
