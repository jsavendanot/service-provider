import { NetworkApiType } from './network';

export interface StepForm {
  id: string;
  name: string;
  repeat: {
    switch: boolean;
    number: number;
    type: string;
    frequencyNumber: number;
    frequencyType: string;
    targetNumber: number;
  };
  dateTime: {
    switch: boolean;
    reminder: boolean;
    reminderDate: string;
  };
  share: {
    whoCanSee: 'Network' | 'OnlyMe' | 'SpecificPeople';
    network: NetworkApiType[];
  };
}

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

export interface GoalRootType {
  goals: Goal[];
  steps: Step[];
  loading: boolean;
}
