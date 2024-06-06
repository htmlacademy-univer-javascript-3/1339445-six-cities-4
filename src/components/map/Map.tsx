import { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapMarker } from './const';
import useMap from '../../hooks/use-map';
import { City } from '../../types/map';
import { OfferBase } from '../../types/offer';

export function Map({city, offers, selectedOffer}: MapProps) {
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
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom,
      );
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      offers.forEach((offer) => {
        leaflet.marker(
          {
            lng: offer.location.longitude,
            lat: offer.location.latitude,
          },
          {
            icon: (offer.id === selectedOffer?.id) ?
              activeCustomIcon :
              defaultCustomIcon,
          }
        ).addTo(map);
      });
    }
  }, [map, offers, selectedOffer, activeCustomIcon, defaultCustomIcon, city]);


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
  offers: OfferBase[];
  selectedOffer: OfferBase | null;
}
