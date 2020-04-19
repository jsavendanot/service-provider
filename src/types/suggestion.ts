export interface GoalSuggestion {
  SuggestionId: string;
  RecoveryPlanId: string;
  SuggestedByUserId: string;
  Name: string;
  ExtraInfo: string;
  GroupName: string;
  GoalInfo: {
    Name: string;
    Description: string;
    IsDeadline: true;
    StartDate: string;
    EndDate: string;
    Image: string;
    ImageType: string;
    VisibleTo: string;
    FocusArea: string;
    Steps: [
      {
        Id: string;
        GoalId: string;
        Name: string;
        RepeatTimes: 0;
        RepeatUnit: string;
        RepeatFrequency: string;
        RepeatTotalTimes: 0;
        VisibleTo: string;
        IsDeadline: true;
        StartDate: string;
        EndDate: string;
      }
    ];
  };
  AcceptedOn: string;
  RejectedOn: string;
}
