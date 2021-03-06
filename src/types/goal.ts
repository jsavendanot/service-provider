import { Network } from './network';

export interface GoalList {
  RecoveryPlanId: string;
  UserId: string;
  GoalId: string;
  GoalName: string;
  GoalDescription: string;
  SharedWithNetworkContactId: string;
  SharedWithName: string;
}

export interface Goal {
  Id: string;
  Name: string;
  Description: string;
  IsDeadline: boolean;
  StartDate: string;
  EndDate: string;
  PercentageComplete: number;
  CompletedDate: string;
  Image: string;
  VisibleTo: 'Network' | 'OnlyMe' | 'SpecificPeople';
  FocusArea: string;
  UserId: string;
}

export interface Step {
  Id: string;
  GoalId: string;
  Name: string;
  RepeatTimes: number;
  RepeatUnit: string;
  RepeatFrequency: string;
  RepeatTotalTimes: number;
  VisibleTo: 'Network' | 'OnlyMe' | 'SpecificPeople' | '';
  IsDeadline: boolean;
  StartDate: string;
  EndDate: string;
  IsCompleted: boolean;
  visitsLeft: number;
}

export interface ProgressCheckIn {
  GoalId: string;
  GoalStepId: string;
  TotalRepeats: number;
  TotalRepeatCompleted: number;
  StepCompleted: number;
}

export interface GoalComment {
  Id: string;
  ParentCommentId: string;
  GoalId: string;
  Message: string;
  PersonName: string;
  CreatedOnDate: string;
  NetworkContactId: string;
}

export interface GoalRootType {
  goals: Goal[];
  steps: Step[];
  progress: ProgressCheckIn[];
  comments: GoalComment[];
  loading: boolean;
}
