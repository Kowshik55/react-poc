import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Chip, CircularProgress, Typography } from '@mui/material';
import type { AppDispatch } from '../store';
import { useAppSelector } from '../store';
import { fetchProductRequest, clearSelectedProduct } from '../store/productSlice';
import BackButton from '../components/BackButton';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { selected, loading, error } = useAppSelector((state) => state.products);
  const page = searchParams.get('page');

  useEffect(() => {
    if (id) {
      dispatch(fetchProductRequest(id));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const handleBackClick = () => {
    const backPath = page ? `/products?page=${page}` : '/products';
    navigate(backPath);
  };

  return (
    <Box>
      <BackButton onClick={handleBackClick} sx={{ mb: 3 }} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 6 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : selected ? (
        <Card sx={{ maxWidth: 1000, mx: 'auto', borderRadius: 4, boxShadow: 6, overflow: 'hidden' }}>
          <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, p: 0 }}>
            <Box sx={{ flex: 1, p: { xs: 4, md: 5 }, backgroundColor: 'background.paper' }}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {selected.title}
              </Typography>
              <Chip label={selected.category} color="primary" sx={{ mb: 2 }} />
              <Typography variant="body1" color="text.secondary" paragraph>
                {selected.description}
              </Typography>
              <Typography variant="h5" fontWeight={700} sx={{ mt: 2 }}>
                ${selected.price.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                SKU: {selected.id}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                minHeight: 360,
                backgroundColor: '#f8fbff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 4
              }}
            >
              <CardMedia
                component="img"
                image={selected.image}
                alt={selected.title}
                sx={{
                  width: '100%',
                  maxWidth: 520,
                  maxHeight: 520,
                  objectFit: 'contain',
                  borderRadius: 3,
                  boxShadow: 3
                }}
              />
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography>No product found.</Typography>
      )}
    </Box>
  );
};

export default ProductDetailPage;
