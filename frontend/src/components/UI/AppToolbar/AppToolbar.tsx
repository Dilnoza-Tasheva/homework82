import {AppBar, Button, styled, Toolbar, Typography} from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import Grid from "@mui/material/Grid2";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../../features/users/usersSlice.ts";
import { Link as RouterLink } from 'react-router-dom';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          <Link to="/">My music app</Link>
        </Typography>

        <Grid container spacing={2}>
          <Grid>
            {user ? (
                <>
                  <Button component={RouterLink} to="/track-history" color="inherit">
                    Track History
                  </Button>
                  <Button component={RouterLink} to="/logout" color="inherit">
                    Logout
                  </Button>
                </>
            ) : (
                <>
                  <Button component={RouterLink} to="/login" color="inherit">
                    Sign In
                  </Button>
                  <Button component={RouterLink} to="/register" color="inherit">
                    Sign Up
                  </Button>
                </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>

  );
};

export default AppToolbar;

