export type Point = {
  lat: number;
  lng: number;
}

export type Marker = {
  title: string;
  point: Point;
}

export type City = {
  title: string;
  point: Point;
  zoom: number;
}
