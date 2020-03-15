/** People */
export interface Person {
  UserId: string;
  Name: string;
  RecoveryPlanId: string;
  FirstName: string;
  Surname: string;
  PreferredName: string;
  Gender: string;
  DateOfBirth: string;
  Photo: string;
  LastRecPlanUpdate: string;
}

export interface PeopleRootType {
  people: Person[];
  loading: boolean;
}
