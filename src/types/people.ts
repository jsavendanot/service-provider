/** People */
export interface Person {
  UserId: string;
  Name: string;
  RecoveryPlanId: string;
  SafetyPlanId: string;
  FirstName: string;
  Surname: string;
  PreferredName: string;
  Gender: string;
  DateOfBirth: string;
  Photo: string;
  ImageType: string;
  ImageUrl: string;
  LastRecPlanUpdate: string;
  SignupDate: string;
  HasUpdate?: boolean;
}

export interface PeopleRootType {
  people: Person[];
  loading: boolean;
}
