import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {MapMarker} from './const';
import useMap from '../../hooks/useMap';
import { City, Marker } from '../../types/map';

export function Map({city, markers, selectedMarker}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: MapMarker.DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const activeCustomIcon = leaflet.icon({
    iconUrl: MapMarker.ACTIVE,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      markers.forEach((marker) => {
        leaflet.marker(
          marker.point,
          {
            icon: (marker.title === selectedMarker?.title) ?
              activeCustomIcon :
              defaultCustomIcon,
          }
        ).addTo(map);
      });
    }
  }, [map, markers, selectedMarker, activeCustomIcon, defaultCustomIcon]);


  return (
    <div
      style={{height: '500px'}}
      ref={mapRef}
    >
    </div>
  );
}

type MapProps = {
  city: City;
  markers: Marker[];
  selectedMarker: Marker | null;
}
