import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Drawer, useTheme } from '@mui/material';
import CardList from './card-list';
import { IconButton } from '@mui/material';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import { Location } from 'src/types';
import useArticlesByLocation from 'src/hooks/useArticlesByLocation';
import useArticlesBySearch from 'src/hooks/useArticlesBySearch';

const getLocationString = (location: Location) => {
  console.log(location);
  if (!location) {
    return 'Unknown Location';
  }

  let locationString = '';
  if (location.locality) {
    locationString += location.locality + ', ';
  }
  if (location.district) {
    locationString += location.district + ', ';
  }
  if (location.state) {
    locationString += location.state + ', ';
  }
  if (location.country) {
    locationString += location.country + ', ';
  }

  if (locationString === '') {
    return 'Unknown Location';
  }
  return `${locationString.slice(0, -2)}`;
};

type DashboardSidebarProps = {
  location: Location;
  search: string;
  open: boolean;
  onClose: () => void;
  mode: 'location' | 'search';
};

export const DashboardSidebar = ({
  location,
  search,
  open,
  onClose,
  mode,
}: DashboardSidebarProps) => {
  const router = useRouter();
  const theme = useTheme();
  let articles;
  if (mode === 'location') {
    articles = useArticlesByLocation(location);
  } else {
    articles = useArticlesBySearch(search);
  }

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          paddingTop: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            position: 'sticky',
            top: '0',
            paddingTop: '2rem',
            paddingBottom: '1rem',
            backgroundColor: 'secondary.main',
            // @ts-ignore
            borderBottom: '1px solid var(--color-ui-gray-light)',
            zIndex: (theme) => theme.zIndex.appBar + 100,
          }}
        >
          <Box>
            <Box className="font--headline font-md3 font-bold">Articles</Box>
            <Box className="font-body mb-xxs font-light font-xxs antialiased gray-dark">
              {mode === 'location'
                ? `Location: ${getLocationString(location)}`
                : `Search: ${search}`}
            </Box>
          </Box>
          <Box sx={{ marginTop: '-1rem', marginRight: '-0.5rem' }}>
            <IconButton onClick={onClose}>
              <NavigateBefore />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <CardList cards={articles} />
        </Box>
      </Box>
    </>
  );

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'secondary.main',
          top: 64,
          height: 'calc(100% - 64px)',
          width: '40%',
          // @ts-ignore
          scrollbarColor: `${theme.palette.gray200} ${theme.palette.secondary.main}`,
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '10px',
            padding: '3px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'secondary.main',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray200',
            border: `2px solid ${theme.palette.secondary.main}`,
            borderRadius: '5px',
          },
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="persistent"
    >
      {content}
    </Drawer>
  );
};
