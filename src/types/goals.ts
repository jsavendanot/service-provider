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
