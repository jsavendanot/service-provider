export type Image = {
  Id: string;
  Data: string;
};

export interface GalleryRootType {
  images: Image[];
  loading: boolean;
}
