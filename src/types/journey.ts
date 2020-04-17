import { Network } from './network';

export interface Journal {
  Id: string;
  Message: string;
  HowAreYouFeeling: 'VerySad' | 'Sad' | 'Neutral' | 'Happy' | 'VeryHappy' | '';
  CreatedOnDate: string;
  VisibleTo: string;
  Image: string;
}

export interface JournalList {
  RecoveryPlanId: string;
  UserId: string;
  JournalId: string;
  SharedWithNetworkContactId: string;
  SharedWithName: string;
}

export interface JourneyRootType {
  journals: Journal[];
  sharedNetwork: Network[];
  loading: boolean;
}
