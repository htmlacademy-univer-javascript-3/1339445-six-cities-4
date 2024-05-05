export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  title: string;
  location: Location;
}

export type Marker = {
  title: string;
  location: Location;
}
