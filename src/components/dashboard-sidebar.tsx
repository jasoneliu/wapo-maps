import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Drawer, useTheme } from '@mui/material';
import CardList from './card-list';
import { IconButton } from '@mui/material';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import articles from '../__mocks__/articles';

type DashboardSidebarProps = {
  onClose: () => void;
  open: boolean;
};

export const DashboardSidebar = (props: DashboardSidebarProps) => {
  const { open, onClose } = props;
  const router = useRouter();
  const theme = useTheme();

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
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
            backgroundColor: 'faint',
            zIndex: (theme) => theme.zIndex.appBar + 100,
          }}
        >
          <Box className="font--headline font-md3 font-bold">Articles</Box>
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
          backgroundColor: 'faint',
          width: 800,
          // @ts-ignore
          scrollbarColor: `${theme.palette.gray200} ${theme.palette.faint}`,
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '10px',
            padding: '3px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'faint',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray200',
            // @ts-ignore
            border: `2px solid ${theme.palette.faint}`,
            borderRadius: '5px',
          },
          // '&::-webkit-scrollbar-track': {
          //   background: 'blue',
          // },
          // *::-webkit-scrollbar-thumb {
          //   background-color: blue;
          //   border-radius: 20px;
          //   border: 3px solid orange;
          // }
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="persistent"
    >
      {content}
    </Drawer>
  );
};
