export interface More {
  title: string;
  value: string;
}

export interface Network {
  Id: string;
  UserId: string;
  ContactId: string;
  Name: string;
  Email: string;
  Phone: string;
  CallForSupport: boolean;
  Address: string;
  Type: 'Person' | 'Organisation' | '';
  Relationship: string;
  Image: string;
  ImageType: string;
  ImageUrl: string;
}

export interface Invitation {
  InvitationId: string;
  Name: string;
  EmailAddress: string;
  Subject: string;
  Message: string;
  UserId: string;
  AcceptedOn: string;
  AccountType: string;
  AllowRecPlanAccess: boolean;
  GoalsToShare: string;
  ShareAllGoals: boolean;
  JournalsToShare: string;
  ShareAllJournals: boolean;
  ShareMyStory: boolean;
  ShareSafetyPlan: boolean;
  ShareNetworkContacts: boolean;
  Relationship: string;
  SharingPurpose: string;
  InvitationCode: string;
  CreatedOn: string;
}

export interface ShareNetworkApi {
  SharedWithNetworkContactId: string;
  SharedWithNetworkName: string;
  SharedOnDate: string;
}

export interface NetworkRootType {
  mycontacts: Network[];
  networks: Network[];
  loading: boolean;
}
