import { FocusArea } from './other';

export interface Suggestion {
  id: string;
  name: string;
}

export interface Strength {
  id: string;
  name: string;
}

export interface Story {
  MyStoryId: string;
  RecoveryPlanId: string;
  Story: string;
  WhereAreYouFrom: string;
  WhatWasLifeLikeForYouGrowingUp: string;
  WhoHaveBeenTheImportantPeopleInYourLife: string;
  WhatChallengesHaveYouHad: string;
  HowHaveYouGotThroughTheToughTimes: string;
  WhatDoYouLikeDoingMost: string;
  WhatWouldSomeoneSayAboutYou: string;
}

export interface StoryRootType {
  story: Story;
  strengths: Strength[];
  focusAreas: FocusArea[];
  loading: boolean;
}
