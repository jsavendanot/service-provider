export interface Suggestion {
  id: string;
  name: string;
}

export interface Value {
  id: string;
  name: string;
}

export interface Unwell {
  things: Value[];
  whos: Value[];
}

export interface Service {
  who: string;
  numbers: Value[];
}

export class ServiceClass implements Service {
  who: string;
  numbers: Value[];
  constructor(who: string) {
    this.who = who;
    this.numbers = [];
  }

  setNumber = (number: string) => {
    this.numbers.push({
      id: number,
      name: number
    });
  };
}

export interface SafetyRootType {
  staywell: Value[];
  stress: Value[];
  difficulties: Value[];
  strategies: Value[];
  pleaseDo: Unwell[];
  doNotDo: Unwell[];
  people: Service[];
  loading: boolean;
}
