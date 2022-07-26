import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Drawer, useTheme } from '@mui/material';
import CardList from './card-list';
import { IconButton } from '@mui/material';
import NavigateBefore from '@mui/icons-material/NavigateBefore';

const exampleArticle = {
  headline: 'D.C. shifts monkeypox vaccine policy to focus on first dose',
  subhead:
    'Other jurisdictions already have shifted to prioritize first doses, including New York and San Francisco, as well as the United Kingdom and Canada.',
  section: 'dc-md-va',
  byline: 'Jenna Portnoy',
  date: 'July 25, 2022 at 8:17 PM EDT',
  imageUrl:
    'https://www.washingtonpost.com/resizer/IVd8AhDaZxO6ID6DgWocGkEYlBM=/300x0/arc-anglerfish-washpost-prod-washpost/public/Q2XRR2HXI4I6ZAO3VQD2HFFINM.jpg?w=240&h=180',
  articleUrl:
    'https://www.washingtonpost.com/dc-md-va/2022/07/25/dc-monkeypox-vaccines-first-dose/',
};

const articles = [
  exampleArticle,
  exampleArticle,
  exampleArticle,
  exampleArticle,
  exampleArticle,
];

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
