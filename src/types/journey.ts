import { Network } from './network';

export interface Journal {
  Id: string;
  Title: string;
  Message: string;
  HowAreYouFeeling: 'VerySad' | 'Sad' | 'Neutral' | 'Happy' | 'VeryHappy' | '';
  CreatedOnDate: string;
  VisibleTo: string;
  Image: string;
  ImageType: string;
}

export interface JournalChart {
  Id: string;
  Message: string;
  HowAreYouFeeling: 1 | 2 | 3 | 4 | 5;
  CreatedOnDate: string;
}

export interface JournalList {
  RecoveryPlanId: string;
  UserId: string;
  JournalId: string;
  SharedWithNetworkContactId: string;
  SharedWithName: string;
}

export interface JournalComment {
  Id: string;
  JournalId: string;
  Message: string;
  PersonName: string;
  CreatedOnDate: string;
}

export interface JourneyRootType {
  journals: Journal[];
  journalsChart: JournalChart[];
  sharedNetwork: Network[];
  comments: JournalComment[];
  loading: boolean;
}
