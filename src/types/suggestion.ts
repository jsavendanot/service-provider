export interface StepInfo {
  Id: string;
  GoalId: string;
  Name: string;
  RepeatTimes: number;
  RepeatUnit: string;
  RepeatFrequency: string;
  RepeatTotalTimes: number;
  VisibleTo: string;
  IsDeadline: boolean;
  StartDate: string;
  EndDate: string;
}

export interface GoalInfo {
  Name: string;
  Description: string;
  IsDeadline: boolean;
  StartDate: string;
  EndDate: string;
  Image: string;
  ImageType: string;
  VisibleTo: string;
  FocusArea: string;
  Steps: StepInfo[];
}

export interface Suggestion {
  SuggestionId: string;
  RecoveryPlanId: string;
  SuggestedByUserId: string;
  Name: string;
  ExtraInfo: string;
  GroupName: string;
  GoalInfo: GoalInfo;
  AcceptedOn: string;
  RejectedOn: string;
}
