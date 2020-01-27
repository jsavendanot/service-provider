export type SafetyCardType = {
  id: number;
  title: string;
  description: string;
  values: {
    id: number;
    value: string;
  }[];
  collapse: boolean;
  change: () => void;
};

export type WarningType = {
  id: number;
  difficulty: {
    title: string;
    description: string;
    values: {
      id: number;
      value: string;
    }[];
  };
  plan: {
    title: string;
    description: string;
    values: {
      id: number;
      value: string;
    }[];
  };
  collapse: boolean;
  change: () => void;
};

export type UnwellType = {
  id: number;
  title: string;
  description: string;
  pleaseDo: {
    id: number;
    values: {
      id: number;
      value: string;
    }[];
    supports?: {
      id: number;
      value: string;
    }[];
  }[];
  dontDo: {
    id: number;
    values: {
      id: number;
      value: string;
    }[];
    supports?: {
      id: number;
      value: string;
    }[];
  }[];
  collapse: boolean;
  change: () => void;
};
