import { useState, useEffect } from 'react';
import axios from 'axios';

const maps = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/`,
  params: { key: 'AIzaSyAUe57u_rCqLInDSAkBXhjMpCFTil_1NzY' },
});

export default function useGeo(address: string): number[] {
  const [location, setLocation] = useState<number[]>([]);

  useEffect(() => {
    async function getData(address: string): Promise<void> {
      const { data } = await maps.get('/geocode/json', {
        params: { address: `${address}` },
      });
      // console.log(data);

      let lat: number = data.results.geometry.location.lat;
      let lng: number = data.results.geometry.location.lng;

      if (lat && lng) {
        setLocation([lat, lng]);
      } else {
        setLocation([0, 0]);
      }
    }

    getData(address);
  }, [address]);

  return location;
}
