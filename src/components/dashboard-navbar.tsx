import styled from '@emotion/styled';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import NavigateNext from '@mui/icons-material/NavigateNext';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import { useTheme } from '@mui/material/styles';
import { InputText } from '@washingtonpost/wpds-ui-kit';
import { WashingtonPost } from '@washingtonpost/wpds-assets';

const DashboardNavbarRoot = styled(AppBar)(({ theme }: { theme: any }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

type DashboardNavbarProps = {
  isSidebarOpen: boolean;
  onSidebarOpen: () => void;
  onSidebarClose: () => void;
};

export const DashboardNavbar = (props: DashboardNavbarProps) => {
  const { isSidebarOpen, onSidebarOpen, onSidebarClose, ...other } = props;
  const theme = useTheme();

  const searchWebsite = (innerText: string) => {
    fetch('http://localhost:5000/locations?topic=' + innerText)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.cities);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <DashboardNavbarRoot theme={theme} {...other}>
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
              onKeyDown={(e: any) => {
                if (e.key === 'Enter') {
                  searchWebsite(e.target.value);
                }
              }}
            />
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
          <Box sx={{ width: '260.333px', height: '40px' }} />
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};
