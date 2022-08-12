import { useState, useEffect } from 'react';
import axios from 'axios';
import { Heatmap } from 'src/types';

const maps = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/`,
  params: { key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY },
});

const articles = axios.create({
  baseURL:
    'https://proxy-wapo-maps.herokuapp.com/https://tabletapi.washingtonpost.com/apps-data-service/',
});

export default function useGeo(address: string): Heatmap {
  let initCoordinates: Heatmap = {
    lat: 0,
    lng: 0,
    weight: 0,
  };
  const [location, setLocation] = useState<Heatmap>(initCoordinates);

  useEffect(() => {
    async function getData(address: string): Promise<void> {
      const { data } = await maps.get('/geocode/json', {
        params: { address: `${address}` },
      });

      const { data: weightData } = await articles.get('/native-search.json', {
        params: { query: `${address}` },
      });

      let result = data;
      let lat: number = 0;
      let lng: number = 0;
      let weight: number = 0;

      if (result.results.length > 0) {
        lat = data.results[0].geometry.location.lat;
        lng = data.results[0].geometry.location.lng;
        weight = weightData.results.total;
      }

      let coordinates: Heatmap = {
        lat: lat,
        lng: lng,
        weight: Math.log(weight),
      };

      setLocation(coordinates);
    }

    getData(address);
  }, [address]);

  return location;
}
