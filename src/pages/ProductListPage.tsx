import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import type { AppDispatch } from '../store';
import { useAppSelector } from '../store';
import { fetchProductsRequest, deleteProductRequest } from '../store/productSlice';

const LIMIT = 5;

const ProductListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, loading, error, pagination } = useAppSelector((state) => state.products);
  const [page, setPage] = useState(() => {
    const pageParam = searchParams.get('page');
    return pageParam ? parseInt(pageParam, 10) : 1;
  });

  useEffect(() => {
    dispatch(fetchProductsRequest({ page, limit: LIMIT }));
  }, [dispatch, page]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setSearchParams({ page: value.toString() }, { replace: true });
  };

  const isInitialLoading = loading && items.length === 0;

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Products
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<AddIcon />} disabled={loading} onClick={() => navigate('/products/new')}>
            Add Product
          </Button>
        </Box>
      </Box>

      {isInitialLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', minHeight: 360, position: 'relative', opacity: loading ? 0.6 : 1, transition: 'opacity 150ms ease' }}>
          <Table size="small" sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: 'primary.main' }}>
              <TableRow sx={{ '& th': { py: 1.5, fontWeight: 700 } }}>
                <TableCell sx={{ color: 'common.white' }}>ID</TableCell>
                <TableCell sx={{ color: 'common.white' }}>Title</TableCell>
                <TableCell sx={{ color: 'common.white' }}>Price</TableCell>
                <TableCell sx={{ color: 'common.white' }}>Category</TableCell>
                <TableCell sx={{ color: 'common.white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((product) => (
                <TableRow
                  key={product.id}
                  hover
                  sx={{
                    cursor: 'pointer',
                    '& td': { py: 1.25 },
                    '&:last-child td': { borderBottom: 0 },
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <IconButton color="primary" disabled={loading} onClick={() => navigate(`/products/${product.id}?page=${page}`)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="secondary" disabled={loading} onClick={() => navigate(`/products/${product.id}/edit?page=${page}`)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" disabled={loading} onClick={() => dispatch(deleteProductRequest(product.id))}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {pagination && pagination.pages > 1 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Total products: {pagination.total}
          </Typography>
          <Pagination
            count={pagination.pages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            disabled={loading}
          />
        </Box>
      )}
      {pagination && pagination.pages === 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Total products: {pagination.total}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductListPage;
