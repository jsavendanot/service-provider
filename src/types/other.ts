export interface FocusArea {
  id: string;
  name: string;
  color: string;
  image: string;
  description: string;
  isSelected: boolean;
}

/** Focus Area API Type */
export interface AreaApiType {
  Id: string;
  Label: string;
  IsSelected: boolean;
  Description: string;
}

export interface OtherRootType {
  focusAreas: FocusArea[];
}
