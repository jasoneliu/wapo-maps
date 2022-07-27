import { useState, useEffect } from 'react';
import axios from 'axios';

const maps = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/`,
  params: { key: 'AIzaSyAUe57u_rCqLInDSAkBXhjMpCFTil_1NzY' },
});

export default function useReverseGeo(lat: number, lng: number): string[] {
  const [location, setLocation] = useState<string[]>([]);

  useEffect(() => {
    async function getData(lat: number, lng: number): Promise<void> {
      const { data } = await maps.get('/geocode/json', {
        params: { latlng: `${lat},${lng}` },
      });
      // console.log(data);

      let result = data;
      let country = '',
        state = '',
        district = '',
        locality = '';

      result.results[0].address_components.forEach((location) => {
        if (location.types.includes('country')) {
          country = location.long_name;
        }
        if (location.types.includes('administrative_area_level_1')) {
          state = location.long_name;
        }
        if (location.types.includes('administrative_area_level_2')) {
          district = location.long_name;
        }
        if (location.types.includes('locality')) {
          locality = location.long_name;
        }
      });

      setLocation([country, state, district, locality]);
    }

    getData(lat, lng);
  }, [lat, lng]);

  return location;
}
