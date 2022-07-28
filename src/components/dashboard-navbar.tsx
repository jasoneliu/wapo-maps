import styled from '@emotion/styled';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import NavigateNext from '@mui/icons-material/NavigateNext';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import { useTheme } from '@mui/material/styles';
import WashingtonPost from '@washingtonpost/wpds-assets/asset/washington-post';

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
          <IconButton
            onClick={isSidebarOpen ? onSidebarClose : onSidebarOpen}
            sx={{
              display: 'inline-flex',
              color: 'secondary.main',
            }}
          >
            {isSidebarOpen ? <NavigateBefore /> : <NavigateNext />}
          </IconButton>
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
          <Box sx={{ width: '40px', height: '40px' }} />
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};