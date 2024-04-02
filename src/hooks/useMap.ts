import {useEffect, useState, useRef, MutableRefObject} from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/map';
import { LeafletSettings } from '../const';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City) {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: city.point,
        zoom: city.zoom,
      });

      const layer = new TileLayer(
        LeafletSettings.URL,
        {
          attribution: LeafletSettings.ATTRIBUTION,
        },
      );

      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
