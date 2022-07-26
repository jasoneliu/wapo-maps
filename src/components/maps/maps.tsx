import React from 'react';
import { Avatar } from '@mui/material';
import GoogleMapReact from 'google-map-react';

const Marker = ({ lat, lng, alt, image }) => (
  <div>
    <Avatar alt={alt} src={image} />
  </div>
);

export const Map = () => {
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
