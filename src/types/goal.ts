import { Network } from './network';

export interface Step {
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
    whoCanSee: 'everyone' | 'me' | 'specific';
    network: Network[];
  };
  status: string;
}

const networkConverter = (value: string): 'everyone' | 'me' | 'specific' => {
  let returnValue: 'everyone' | 'me' | 'specific' = 'everyone';
  if (value === 'Only Me') {
    returnValue = 'me';
  } else if (value === 'Specific People') {
    returnValue = 'specific';
  }
  return returnValue;
};

export class StepClass implements Step {
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
    whoCanSee: 'everyone' | 'me' | 'specific';
    network: any[];
  };
  status: string;

  constructor(
    Id: string,
    Name: string,
    RepeatTimes: number,
    RepeatUnit: string,
    RepeatTotalTimes: number,
    VisibleTo: string
  ) {
    this.id = Id;
    this.name = Name;
    this.repeat = {
      switch: RepeatTimes > 0 ? true : false,
      number: RepeatTimes,
      type: RepeatUnit,
      frequencyNumber: 0,
      frequencyType: '',
      targetNumber: RepeatTotalTimes
    };
    this.dateTime = {
      switch: false,
      reminder: false,
      reminderDate: ''
    };
    this.share = {
      whoCanSee: networkConverter(VisibleTo),
      network: []
    };
    this.status = '';
  }
}

export interface Goal {
  id: string;
  name: string;
  desc: string;
  deadline: {
    switch: boolean;
    startDate: string;
    endDate: string;
  };
  percent: number;
  progress: string;
  completedDate: Date;
  steps: Step[];
  focusAreaId: string;
  visibleTo?: 'everyone' | 'me' | 'specific';
  status: 'active' | 'pending' | 'declined';
}

export class GoalClass implements Goal {
  id: string;
  name: string;
  desc: string;
  deadline: {
    switch: boolean;
    startDate: string;
    endDate: string;
  };
  percent: number;
  completedDate: Date;
  progress: string;
  steps: Step[];
  focusAreaId: string;
  visibleTo?: 'everyone' | 'me' | 'specific';
  status: 'active' | 'pending' | 'declined';

  constructor(
    Id: string,
    Name: string,
    Description: string,
    PercentageComplete: number,
    focusAreaId: string,
    CompletedDate: Date,
    visibleTo?: string
  ) {
    this.id = Id;
    this.name = Name;
    this.desc = Description;
    this.percent = PercentageComplete;
    this.completedDate = CompletedDate;
    this.progress = '';
    this.steps = [];
    this.focusAreaId = focusAreaId;
    this.deadline = {
      switch: false,
      startDate: '',
      endDate: ''
    };
    this.visibleTo = networkConverter(visibleTo!);
    this.status = 'active';
  }

  setProgress(numberOfSteps: number) {
    this.progress = numberOfSteps + ' steps';
  }

  setStep(steps: Step[]) {
    this.steps = steps;
  }

  setDeadline(IsDeadline: boolean, StartDate: string, EndDate: string) {
    this.deadline.switch = IsDeadline;
    this.deadline.startDate = StartDate;
    this.deadline.endDate = EndDate;
  }
}

export interface GoalApiType {
  Id: string;
  Name: string;
  Description: string;
  IsDeadline: boolean;
  StartDate: string;
  EndDate: string;
  PercentageComplete: number;
  CompletedDate: string;
  Image: string;
  VisibleTo: string;
  FocusArea: string;
  UserId: string;
}

export interface StepApiType {
  Id: string;
  GoalId: string;
  Name: string;
  RepeatTimes: number;
  RepeatUnit: string;
  RepeatTotalTimes: number;
  VisibleTo: string;
}

export interface GoalApiListType {
  RecoveryPlanId: string;
  UserId: string;
  GoalId: string;
  GoalName: string;
  GoalDescription: string;
  SharedWithNetworkContactId: string;
  SharedWithName: string;
}

export interface StepApiType {
  Id: string;
  GoalId: string;
  Name: string;
  RepeatTimes: number;
  RepeatUnit: string;
  RepeatTotalTimes: number;
  VisibleTo: string;
}

export interface GoalRootType {
  goals: Goal[];
  loading: boolean;
}
