import { useState, useEffect } from 'react';
import axios from 'axios';

const maps = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/`,
  params: { key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY },
});

export default function useGeo(address: string): number[] {
  const [location, setLocation] = useState<number[]>([]);

  useEffect(() => {
    async function getData(address: string): Promise<void> {
      const { data } = await maps.get('/geocode/json', {
        params: { address: `${address}` },
      });
      console.log(data);

      let lat: number = 0;
      let lng: number = 0;

      if (data.results.length>0) {
        lat = data.results[0].geometry.location.lat;
        lng = data.results[0].geometry.location.lng;
      }

      if (lat && lng) {
        setLocation([lat, lng]);
      }
    }

    getData(address);
  }, [address]);

  return location;
}
