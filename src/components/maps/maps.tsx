import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import useReverseGeo from 'src/hooks/useReverseGeo';
import PlaceIcon from '@mui/icons-material/Place';

const Marker = ({ lat, lng }) => (
    <div id={`${lat}+${lng}`}>
      <PlaceIcon fontSize="large" />
    </div>
);

export const Map = () => {
  const [lat, setLat] = useState(38.9028771);
  const [lng, setLng] = useState(-77.0308094);
  const location = useReverseGeo(lat, lng);

  console.log(location);

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
            bootstrapURLKeys={{ key: 'AIzaSyAUe57u_rCqLInDSAkBXhjMpCFTil_1NzY' }}
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
