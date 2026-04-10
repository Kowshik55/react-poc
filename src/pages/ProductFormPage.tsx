import { useEffect, useMemo, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import type { AppDispatch } from '../store';
import { useAppSelector } from '../store';
import {
  clearCreated,
  clearSelectedProduct,
  createProductRequest,
  fetchProductRequest,
  updateProductRequest
} from '../store/productSlice';
import BackButton from '../components/BackButton';

const schema = yup.object({
  title: yup.string().required('Required'),
  price: yup.number().required('Required').positive('Must be positive'),
  description: yup.string().required('Required'),
  category: yup.string().required('Required'),
  image: yup.string().url('Must be a valid URL').required('Required')
});

const ProductFormPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const page = searchParams.get('page');
  const { loading, error, created, updated, selected } = useAppSelector((state) => state.products);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    dispatch(clearCreated());
    if (isEditMode && id) {
      dispatch(fetchProductRequest(id));
    } else {
      dispatch(clearSelectedProduct());
    }

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (created || updated) {
      setToastMessage(updated ? 'Product updated successfully' : 'Product created successfully');
      setToastSeverity('success');
      setToastOpen(true);
      const timeout = window.setTimeout(() => {
        const backPath = page ? `/products?page=${page}` : '/products';
        navigate(backPath);
      }, 1200);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [created, updated, navigate, page]);

  useEffect(() => {
    if (error) {
      setToastMessage(error);
      setToastSeverity('error');
      setToastOpen(true);
    }
  }, [error]);

  const handleToastClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  const handleBackClick = () => {
    const backPath = page ? `/products?page=${page}` : '/products';
    navigate(backPath);
  };

  const formik = useFormik({
    initialValues: {
      title: selected?.title ?? '',
      price: selected?.price ?? 0,
      description: selected?.description ?? '',
      category: selected?.category ?? '',
      image: selected?.image ?? ''
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      if (isEditMode && id) {
        dispatch(updateProductRequest({ id: Number(id), data: values }));
      } else {
        dispatch(createProductRequest(values));
      }
    }
  });

  const previewImage = useMemo(() => {
    if (!formik.values.image) {
      return '';
    }
    return formik.values.image;
  }, [formik.values.image]);

  return (
    <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, mt: 4 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 8 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <BackButton onClick={handleBackClick} />
            <Typography variant="h5" fontWeight={700}>
              {isEditMode ? 'Edit Product' : 'Add Product'}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            {isEditMode
              ? 'Update product details and keep your inventory data accurate.'
              : 'Add a new product to your catalog and watch it appear instantly in your inventory list.'}
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                minRows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
              <TextField
                fullWidth
                id="category"
                name="category"
                label="Category"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
              />
              <TextField
                fullWidth
                id="image"
                name="image"
                label="Image URL"
                value={formik.values.image}
                onChange={formik.handleChange}
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
              />
              <Button type="submit" variant="contained" size="large" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : isEditMode ? 'Update Product' : 'Create Product'}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 4, boxShadow: 6, overflow: 'hidden' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Live preview
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Review the product image and details before saving. The preview updates as you enter the form values.
          </Typography>
          <Box sx={{ mb: 3, borderRadius: 3, overflow: 'hidden', backgroundColor: '#f4f7ff', minHeight: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {previewImage ? (
              <CardMedia component="img" image={previewImage} alt="Preview" sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            ) : (
              <Typography color="text.secondary">Enter an image URL to preview.</Typography>
            )}
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Stack spacing={1}>
            <Typography variant="subtitle1" fontWeight={700}>
              {formik.values.title || 'Product title'}
            </Typography>
            <Typography color="text.secondary">
              {formik.values.category || 'Category'}
            </Typography>
            <Typography color="text.secondary">
              {formik.values.price ? `$${Number(formik.values.price).toFixed(2)}` : 'Price'}
            </Typography>
            <Typography color="text.secondary">
              {formik.values.description || 'Add a short product description to see it here.'}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar open={toastOpen} autoHideDuration={4000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity={toastSeverity} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductFormPage;
