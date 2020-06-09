import { Network } from './network';

export interface Value {
  id: string;
  name: string;
}

export interface Unwell {
  UnwellId: string;
  Name: string;
  Description: string;
  SafetyPlanId: string;
  NetworkContactIdResponsible: string;
}

export interface SafetyRootType {
  staywell: Value[];
  stress: Value[];
  difficulties: Value[];
  strategies: Value[];
  pleaseDo: Unwell[];
  doNotDo: Unwell[];
  people: Network[];
  organisations: Network[];
  loading: boolean;
}
