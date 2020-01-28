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

export type ContactType = {
  id: number;
  title: string;
  description: string;
  people: {
    id: number;
    values: {
      id: number;
      value: string;
    }[];
    phones: {
      id: number;
      value: string;
    }[];
  }[];
  services: {
    id: number;
    values: {
      id: number;
      value: string;
    }[];
    phones: {
      id: number;
      value: string;
    }[];
  }[];
  collapse: boolean;
  change: () => void;
};
