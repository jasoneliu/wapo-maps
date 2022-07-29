import { useState, Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import NavigateNext from '@mui/icons-material/NavigateNext';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import { useTheme } from '@mui/material/styles';
import { InputText, Icon } from '@washingtonpost/wpds-ui-kit';
import { Search, WashingtonPost } from '@washingtonpost/wpds-assets';

const DashboardNavbarRoot = styled(AppBar)(({ theme }: { theme: any }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

type DashboardNavbarProps = {
  isSidebarOpen: boolean;
  onSidebarOpen: () => void;
  onSidebarClose: () => void;
  onSetModeSearch: () => void;
  setSearch: Dispatch<SetStateAction<string>>;
};

export const DashboardNavbar = ({
  isSidebarOpen,
  onSidebarOpen,
  onSidebarClose,
  onSetModeSearch,
  setSearch,
}: DashboardNavbarProps) => {
  const theme = useTheme();
  const [currSearch, setCurrSearch] = useState('');

  return (
    <>
      <DashboardNavbarRoot theme={theme}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
            backgroundColor: 'primary.main',
            color: 'secondary.main',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', color: 'primary.main', gap: '1rem' }}>
            <IconButton
              onClick={isSidebarOpen ? onSidebarClose : onSidebarOpen}
              sx={{
                display: 'inline-flex',
                color: 'secondary.main',
              }}
            >
              {isSidebarOpen ? <NavigateBefore /> : <NavigateNext />}
            </IconButton>
            <InputText
              label="Search"
              id="search"
              name="search"
              icon="right"
              value={currSearch}
              onChange={(e: any) => {
                setCurrSearch(e.target.value);
              }}
              onKeyDown={(e: any) => {
                if (e.key === 'Enter') {
                  setSearch(currSearch);
                  onSetModeSearch();
                }
              }}
              onButtonIconClick={() => {
                setSearch(currSearch);
                onSetModeSearch();
              }}
            >
              <Icon label="search">
                <Search />
              </Icon>
            </InputText>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <WashingtonPost width={188} />
            <Box
              sx={{
                fontSize: '0.75rem',
                fontStyle: 'italic',
              }}
            >
              Democracy Dies in Darkness
            </Box>
          </Box>
          <Box sx={{ width: '276.333px', height: '40px' }} />
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};
