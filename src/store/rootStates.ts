import { SessionRootState } from './sessionState';

export interface RootState {
  session: SessionRootState;
}

export type UnionRootState = SessionRootState;
