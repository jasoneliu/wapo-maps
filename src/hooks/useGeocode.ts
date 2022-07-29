import { useState, useEffect } from 'react';
import axios from 'axios';
import { Coordinates } from 'src/types';

const maps = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/`,
  params: { key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY },
});

export default function useGeo(address: string): Coordinates {
  let initCoordinates: Coordinates = {
    lat: 0,
    lng: 0,
  };
  const [location, setLocation] = useState<Coordinates>(initCoordinates);

  useEffect(() => {
    async function getData(address: string): Promise<void> {
      const { data } = await maps.get('/geocode/json', {
        params: { address: `${address}` },
      });
      // console.log(data);

      let result = data;
      let lat: number = 0;
      let lng: number = 0;

      if (result.results.length>0) {
        lat = data.results[0].geometry.location.lat;
        lng = data.results[0].geometry.location.lng;
      }

      let coordinates: Coordinates = {
        lat: lat,
        lng: lng,
      };

      setLocation(coordinates);
    }

    getData(address);
  }, [address]);

  return location;
}
