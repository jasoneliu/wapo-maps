import { useState } from 'react';
import { Avatar } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import useReverseGeo from 'src/hooks/useReverseGeo';

const Marker = ({ lat, lng, alt, image }) => (
  <div>
    <Avatar alt={alt} src={image} />
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
          console.log(e.lat);
          setLat(e.lat);
          console.log(e.lng);
          setLng(e.lng);
        }}
      >
        <Marker
          lat={38.9028771}
          lng={-77.0308094}
          alt="Washington DC"
          image="https://picsum.photos/100"
        />
        <Marker
          lat={40.6965859}
          lng={-74.5540074}
          alt="New York"
          image="https://picsum.photos/100"
        />
        <Marker
          lat={30.3079827}
          lng={-97.8934871}
          alt="Texas"
          image="https://picsum.photos/100"
        />
        <Marker
          lat={37.3902151}
          lng={-122.0892005}
          alt="California"
          image="https://picsum.photos/100"
        />
      </GoogleMapReact>
    </div>
  );
};
