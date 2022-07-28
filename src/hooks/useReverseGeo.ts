import { useState, useEffect } from 'react';
import axios from 'axios';
import { Location } from 'src/types';

const maps = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/`,
  params: { key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY },
});

export default function useReverseGeo(lat: number, lng: number): Location {
  let initLocation: Location = {
    country: '',
    state: '',
    district: '',
    locality: '',
  };
  const [location, setLocation] = useState<Location>(initLocation);

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

        result.results.forEach((addy) => {
          addy.address_components.forEach((location) => {
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
          })
        })

      let location: Location = {
        country: country,
        state: state,
        district: district,
        locality: locality,
      };
      setLocation(location);
    }

    getData(lat, lng);
  }, [lat, lng]);

  return location;
}
