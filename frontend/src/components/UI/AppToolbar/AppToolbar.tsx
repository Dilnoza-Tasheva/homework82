import { AppBar, Avatar, Button, styled, Toolbar, Typography, Box } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../../features/users/usersSlice.ts';
import { Link as RouterLink } from 'react-router-dom';
import UserMenu from './UserMenu.tsx';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
      <AppBar position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">My music app</Link>
          </Typography>

          <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
            {user ? (
                <>
                  <Button component={RouterLink} to="/track-history" color="inherit">
                    Track History
                  </Button>

                  {user?.role === 'admin' && (
                      <Button component={RouterLink} to="/admin/artists" color="inherit">
                        Admin Artists
                      </Button>
                  )}

                  <Button component={RouterLink} to="/artists/new" color="inherit">
                    Add Artist
                  </Button>
                  <Button component={RouterLink} to="/albums/new" color="inherit">
                    Add Album
                  </Button>
                  <Button component={RouterLink} to="/tracks/new" color="inherit">
                    Add Track
                  </Button>

                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar src={user.avatar || '/default-avatar.png'} alt={user.displayName} />
                    <Typography variant="body1">{user.displayName}</Typography>
                  </Box>

                  <UserMenu user={user} />
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
        </Toolbar>
      </AppBar>
  );
};

export default AppToolbar;
