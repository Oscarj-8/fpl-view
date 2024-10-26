export interface Player {
  id: number;
  web_name: string;
  team: number;
  element_type: number;
  now_cost: number;
  total_points: number;
  event_points: number;
  selected_by_percent: string;
  form: string;
}

export interface Team {
  id: number;
  name: string;
  player_first_name: string;
  player_last_name: string;
  summary_overall_points: number;
  summary_overall_rank: number;
  picks: Array<{
    element: number;
    position: number;
    is_captain: boolean;
    is_vice_captain: boolean;
    multiplier: number;
  }>;
  current_event: number;
}

export type Pick = {
  element: number;
  position: number;
  multiplier: number;
  is_captain: boolean;
  is_vice_captain: boolean;
};

export type LivePlayerData = {
  id: number;
  stats: {
    total_points: number;
  };
};
