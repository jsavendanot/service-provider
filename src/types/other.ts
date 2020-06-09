export interface FocusArea {
  id: string;
  name: string;
  color: string;
  image: string;
  description: string;
  isSelected: boolean;
  isSuggested?: boolean;
  SuggestionId?: string;
}

/** Focus Area API Type */
export interface AreaApiType {
  Id: string;
  Label: string;
  IsSelected: boolean;
  Description: string;
}

export interface LastUpdate {
  RecoveryPlanId: string;
  NewGoalCount: number;
  NewGoalStepCount: number;
  NewGoalStepCheckinCount: number;
  NewJournalEntryCount: number;
}

export interface OtherRootType {
  focusAreas: FocusArea[];
}
