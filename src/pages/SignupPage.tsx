import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { useDispatch } from 'react-redux';
import { signup } from '../services/authService';
import { loginSuccess } from '../store/authSlice';
import type { AppDispatch } from '../store';

const validationSchema = yup.object({
  username: yup.string().required('Required'),
  password: yup.string().required('Required').min(6, 'Password must be at least 6 characters')
});

const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(null);
      setLoading(true);
      try {
        const response = await signup(values);
        localStorage.setItem('token', response.token);
        dispatch(loginSuccess(response.token));
        navigate('/products');
      } catch (reason: any) {
        setError(reason?.response?.data?.message || 'Signup failed.');
      } finally {
        setLoading(false);
      }
    }
  });

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
        <Box sx={{ p: 5, background: 'linear-gradient(135deg, #5e92f3, #1e88e5)', color: 'common.white' }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Create your account
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Start managing inventory with your own secure product dashboard.
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
                {loading ? <CircularProgress size={24} /> : 'Create Account'}
              </Button>
            </Stack>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" underline="hover">
              Login here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignupPage;
