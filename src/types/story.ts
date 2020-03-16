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
  story: string;
  storyId: string;
}

export interface StoryApiType {
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
  story: Story | null;
  strengths: Strength[];
  focusAreas: FocusArea[];
  loading: boolean;
}
