import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, Navigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import type { AppDispatch } from '../store';
import { useAppSelector } from '../store';
import { loginRequest, type AuthState } from '../store/authSlice';

const validationSchema = yup.object({
  username: yup.string().required('Required'),
  password: yup.string().required('Required')
});

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const auth = useAppSelector((state) => state.auth as AuthState);
  const { token, loading, error } = auth;
  const from = (location.state as any)?.from?.pathname || '/products';

  useEffect(() => {
    document.title = 'Login | Product POC';
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginRequest(values));
    }
  });

  if (token) {
    return <Navigate to={from} replace />;
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 128px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 520, borderRadius: 4, boxShadow: 8, overflow: 'hidden' }}>
        <Box sx={{ p: 5, background: 'linear-gradient(135deg, #1e88e5, #5e92f3)', color: 'common.white' }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Secure product access
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Sign in to manage products, create new inventory items, and view details with a modern interface.
          </Typography>
        </Box>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              {error ? (
                <Typography color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              ) : null}
              <Button type="submit" fullWidth variant="contained" size="large" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Login'}
              </Button>
            </Stack>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            New here?{' '}
            <Link component={RouterLink} to="/signup" underline="hover">
              Create an account
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
