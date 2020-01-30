export type Step = {
  id: number;
  name: string;
  date: string;
  status: string;
};

export type Goal = {
  id: number;
  focusArea: string;
  goalName: string;
  status: 'active' | 'pending' | 'declined';
  percent: number;
  steps: Step[];
};

export type StepForm = {
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
};
