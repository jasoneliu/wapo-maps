export type Article = {
  headline: string;
  subhead: string;
  section: string;
  byline: string;
  date: string;
  imageUrl: string;
  articleUrl: string;
};

export type Location = {
  country: string;
  state: string;
  district: string;
  locality: string;
};

export type Coordinates = {
  lat: number;
  lng: number;
}

export type Heatmap = {
  lat: number,
  lng: number,
  weight: number,
}