import { Network } from './network';

export interface Journal {
  id: string;
  title: string;
  date: string;
  time: string;
  journalText: string;
  feeling: 'VerySad' | 'Sad' | 'Neutral' | 'Happy' | 'VeryHappy' | '';
  symptoms: {
    work: boolean;
    sleep: boolean;
    routine: boolean;
  };
  image: string;
  share: {
    whoCanSee: 'me' | 'everyone' | 'specific';
    network: Network[];
  };
}

const networkConverter = (value: string): 'everyone' | 'me' | 'specific' => {
  let returnValue: 'everyone' | 'me' | 'specific' = 'everyone';
  if (value === 'OnlyMe') {
    returnValue = 'me';
  } else if (value === 'SpecificPeople') {
    returnValue = 'specific';
  }
  return returnValue;
};

export class JournalClass implements Journal {
  id: string;
  title: string;
  date: string;
  time: string;
  journalText: string;
  feeling: 'VerySad' | 'Sad' | 'Neutral' | 'Happy' | 'VeryHappy' | '';
  symptoms: {
    work: boolean;
    sleep: boolean;
    routine: boolean;
  };
  image: string;
  share: {
    whoCanSee: 'me' | 'everyone' | 'specific';
    network: any[];
  };

  constructor(
    id: string,
    title: string,
    date: string,
    time: string,
    journalText: string,
    feeling: 'VerySad' | 'Sad' | 'Neutral' | 'Happy' | 'VeryHappy' | '',
    visibleTo: string,
    network: Network[]
  ) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.time = time;
    this.journalText = journalText;
    this.feeling = feeling;
    this.image = '';
    this.symptoms = {
      work: false,
      sleep: false,
      routine: false
    };
    this.share = {
      whoCanSee: networkConverter(visibleTo),
      network: network
    };
  }
}

export interface JournalApiType {
  Id: string;
  Message: string;
  HowAreYouFeeling: 'VerySad' | 'Sad' | 'Neutral' | 'Happy' | 'VeryHappy' | '';
  CreatedOnDate: string;
  VisibleTo: string;
  Image: string;
}

export interface JournalApiListType {
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
