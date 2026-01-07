// Player Models
export interface PlayerSearchResult {
  account_id: number;
  personaname: string;
  avatarfull: string;
  last_match_time?: string;
  similarity?: number;
}

export interface Player {
  account_id: number;
  personaname: string;
  name?: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  profileurl: string;
  last_login?: string;
  loccountrycode?: string;
  rank_tier?: number;
  leaderboard_rank?: number;
  profile: {
    account_id: number;
    personaname: string;
    name?: string;
    cheese?: number;
    steamid?: string;
    avatar?: string;
    avatarmedium?: string;
    avatarfull?: string;
    profileurl?: string;
    last_login?: string;
    loccountrycode?: string;
  };
}

export interface PlayerWinLoss {
  win: number;
  lose: number;
}

// Match Models
export interface Match {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  duration: number;
  game_mode: number;
  lobby_type: number;
  hero_id: number;
  start_time: number;
  version?: number;
  kills: number;
  deaths: number;
  assists: number;
  skill?: number;
  average_rank?: number;
  leaver_status?: number;
  party_size?: number;
}

export interface MatchDetail {
  match_id: number;
  barracks_status_dire: number;
  barracks_status_radiant: number;
  chat?: any[];
  cluster: number;
  cosmetics?: any;
  dire_score: number;
  dire_team_id?: number;
  draft_timings?: any[];
  duration: number;
  engine: number;
  first_blood_time: number;
  game_mode: number;
  human_players: number;
  leagueid: number;
  lobby_type: number;
  match_seq_num: number;
  negative_votes: number;
  objectives?: any[];
  picks_bans?: any[];
  positive_votes: number;
  radiant_gold_adv?: number[];
  radiant_score: number;
  radiant_team_id?: number;
  radiant_win: boolean;
  radiant_xp_adv?: number[];
  start_time: number;
  teamfights?: any[];
  tower_status_dire: number;
  tower_status_radiant: number;
  version: number;
  replay_salt?: number;
  series_id?: number;
  series_type?: number;
  players: MatchPlayer[];
  patch: number;
  region: number;
  all_word_counts?: any;
  my_word_counts?: any;
  throw?: number;
  loss?: number;
  replay_url?: string;
}

export interface MatchPlayer {
  account_id?: number;
  player_slot: number;
  hero_id: number;
  item_0: number;
  item_1: number;
  item_2: number;
  item_3: number;
  item_4: number;
  item_5: number;
  backpack_0?: number;
  backpack_1?: number;
  backpack_2?: number;
  item_neutral?: number;
  kills: number;
  deaths: number;
  assists: number;
  leaver_status: number;
  last_hits: number;
  denies: number;
  gold_per_min: number;
  xp_per_min: number;
  level: number;
  hero_damage: number;
  tower_damage: number;
  hero_healing: number;
  gold: number;
  gold_spent: number;
  scaled_hero_damage?: number;
  scaled_tower_damage?: number;
  scaled_hero_healing?: number;
  personaname?: string;
  name?: string;
  radiant_win?: boolean;
  start_time?: number;
  duration?: number;
  cluster?: number;
  lobby_type?: number;
  game_mode?: number;
  patch?: number;
  region?: number;
  isRadiant?: boolean;
  win?: number;
  lose?: number;
  total_gold?: number;
  total_xp?: number;
  kills_per_min?: number;
  kda?: number;
  abandons?: number;
  rank_tier?: number;
}

// Hero Models
export interface Hero {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  img: string;
  icon: string;
  base_health: number;
  base_health_regen?: number;
  base_mana: number;
  base_mana_regen?: number;
  base_armor: number;
  base_mr: number;
  base_attack_min: number;
  base_attack_max: number;
  base_str: number;
  base_agi: number;
  base_int: number;
  str_gain: number;
  agi_gain: number;
  int_gain: number;
  attack_range: number;
  projectile_speed: number;
  attack_rate: number;
  move_speed: number;
  turn_rate?: number;
  cm_enabled: boolean;
  legs: number;
  hero_id?: number;
  turbo_picks?: number;
  turbo_wins?: number;
  pro_ban?: number;
  pro_win?: number;
  pro_pick?: number;
  '1_pick'?: number;
  '1_win'?: number;
  '2_pick'?: number;
  '2_win'?: number;
  '3_pick'?: number;
  '3_win'?: number;
  '4_pick'?: number;
  '4_win'?: number;
  '5_pick'?: number;
  '5_win'?: number;
  '6_pick'?: number;
  '6_win'?: number;
  '7_pick'?: number;
  '7_win'?: number;
  '8_pick'?: number;
  '8_win'?: number;
}

export interface HeroStats {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  img: string;
  icon: string;
  pro_win: number;
  pro_pick: number;
  hero_id: number;
  pro_ban: number;
  '1_pick': number;
  '1_win': number;
  '2_pick': number;
  '2_win': number;
  '3_pick': number;
  '3_win': number;
  '4_pick': number;
  '4_win': number;
  '5_pick': number;
  '5_win': number;
  '6_pick': number;
  '6_win': number;
  '7_pick': number;
  '7_win': number;
  '8_pick': number;
  '8_win': number;
  turbo_picks: number;
  turbo_wins: number;
}

// Pro Match Models
export interface ProMatch {
  match_id: number;
  duration: number;
  start_time: number;
  radiant_team_id?: number;
  radiant_name?: string;
  dire_team_id?: number;
  dire_name?: string;
  leagueid: number;
  league_name?: string;
  series_id: number;
  series_type: number;
  radiant_score: number;
  dire_score: number;
  radiant_win: boolean;
  radiant?: boolean;
}

// Utility Models
export interface ApiError {
  error: string;
  message?: string;
}

export interface WinRate {
  wins: number;
  total: number;
  percentage: number;
}

