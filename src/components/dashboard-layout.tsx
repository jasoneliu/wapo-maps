import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { Map } from './maps';
import useReverseGeo from 'src/hooks/useReverseGeo';

const DashboardLayoutRoot = styled('div')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
}));

export const DashboardLayout = () => {
  const [lat, setLat] = useState(38.9028771);
  const [lng, setLng] = useState(-77.0308094);
  const location = useReverseGeo(lat, lng);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setSidebarOpen(true);
  }, [lat, lng]);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Map lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarOpen={() => setSidebarOpen(true)}
        onSidebarClose={() => setSidebarOpen(false)}
      />
      <DashboardSidebar
        location={location}
        open={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
};
