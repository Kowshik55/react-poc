import { ReactNode } from 'react';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { useAppSelector } from '../store';
import type { AppDispatch } from '../store';

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token);
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, rgba(241, 245, 255, 1) 0%, rgba(255, 255, 255, 1) 45%, rgba(237, 242, 255, 1) 100%)'
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        color="transparent"
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: 'rgba(255,255,255,0.86)',
          backdropFilter: 'blur(12px)'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', flexWrap: 'wrap', py: 1.5 }}>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(token ? '/products' : '/')}
            >
              <Typography variant="h6" fontWeight={700} letterSpacing={0.3}>
                Product POC
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mt: { xs: 1, sm: 0 } }}>
              {token ? (
                <Button color="primary" variant="outlined" onClick={() => dispatch(logout())}>
                  Logout
                </Button>
              ) : !isAuthPage ? (
                <>
                  <Button color="primary" variant="text" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button color="primary" variant="contained" onClick={() => navigate('/signup')}>
                    Sign up
                  </Button>
                </>
              ) : null}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ pt: 5, pb: 6 }}>
        {children}
      </Container>
    </Box>
  );
};

export default AppShell;
