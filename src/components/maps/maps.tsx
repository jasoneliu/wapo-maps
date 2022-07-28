import { Dispatch, SetStateAction } from 'react';
import GoogleMapReact from 'google-map-react';
import PlaceIcon from '@mui/icons-material/Place';

type MapProps = {
  lat: number;
  lng: number;
  setLat: Dispatch<SetStateAction<number>>;
  setLng: Dispatch<SetStateAction<number>>;
};

const Marker = ({ lat, lng }) => (
  <div
    id={`lat: ${lat}, lng: ${lng}`}
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <PlaceIcon fontSize="large" />
  </div>
);

export const Map = ({ lat, lng, setLat, setLng }: MapProps) => {
  const defaultProps = {
    center: {
      lat: 38.9028771,
      lng: -77.0308094,
    },
    zoom: 10,
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={(e) => {
          setLat(e.lat);
          setLng(e.lng);
        }}
      >
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
};
