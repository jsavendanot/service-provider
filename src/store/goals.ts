export type StepProps = {
  id: number;
  name: string;
  date: string;
  status: string;
};

export type GoalProps = {
  id: number;
  focusArea: string;
  goalName: string;
  status: 'active' | 'pending' | 'declined';
  percent: number;
  steps: StepProps[];
};
