import styled from '@emotion/styled';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from '@mui/material';
import NavigateNext from '@mui/icons-material/NavigateNext';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import WashingtonPost from '@washingtonpost/wpds-assets/asset/washington-post';
import { InputText } from '@washingtonpost/wpds-input-text';
import { Icon } from '@washingtonpost/wpds-icon';
import Search from "@washingtonpost/wpds-assets/asset/search";

const DashboardNavbarRoot = styled(AppBar)(({ theme }: { theme: any }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

type DashboardNavbarProps = {
  onSidebarOpen: () => void;
};

export const DashboardNavbar = (props: DashboardNavbarProps) => {
  const { onSidebarOpen, ...other } = props;
  const theme = useTheme();

  const searchWebsite = (innerText: string) => {
    fetch('http://10.4.7.15:5000/search?query=' + innerText).then(response => response.json()).then(data => {
      console.log(data)
    }).catch(error => console.log(error))
  }

  return (
    <>
      <DashboardNavbarRoot theme={theme} {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: 'inline-flex',
            }}
          >
            <NavigateNext />
          </IconButton>
          <div style={{ width: "100%" }}>
            <InputText css={{ color: 'black', flexGrow: "inherit"}} icon="right" label="Search" onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  searchWebsite(e.target.value);
                }
              }}
              onButtonIconClick={(e: any) => searchWebsite(e.target.value)} id={''} name={''}>
              <Icon label="">
                <Search />
              </Icon>
            </InputText>
          </div>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};
