export interface Journal {
  id: string;
  title: string;
  date: string;
  time: string;
  journalText: string;
  feeling: string;
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
}
