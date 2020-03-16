export interface FocusArea {
  id: string;
  name: string;
  color: string;
  image: string;
  description: string;
  isSelected: boolean;
}

export class FocusAreaClass implements FocusArea {
  id: string;
  name: string;
  color: string;
  image: string;
  description: string;
  isSelected: boolean;

  constructor(
    id: string,
    name: string,
    color: string,
    image: string,
    description: string,
    isSelected: boolean
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.image = image;
    this.description = description;
    this.isSelected = isSelected;
  }
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
