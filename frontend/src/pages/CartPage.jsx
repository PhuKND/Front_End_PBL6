import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  TextField,
  Divider,
  CircularProgress,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert as MuiAlert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import http from '../api/http';

const formatCurrency = (price, currency = 'VND') => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
  }).format(Number(price || 0));
};

export default function CartPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await http.get('/carts/items/mycarts');

      let items = [];
      if (Array.isArray(response.data)) {
        items = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        items = response.data.data;
      } else if (response.data?.data?.content && Array.isArray(response.data.data.content)) {
        items = response.data.data.content;
      }
      
      setCartItems(items);
    } catch (err) {
      console.error('Error loading cart:', err);
      setError(err?.response?.data?.message || 'Không thể tải giỏ hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleDeleteClick(productId);
      return;
    }

    try {
      setUpdating({ ...updating, [productId]: true });
      await http.put(`/carts/items/${productId}`, { quantity: newQuantity });

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.productId === productId
            ? { ...item, quantity: newQuantity, totalPrice: item.originPrice * newQuantity }
            : item
        )
      );
      
      setSnackbar({ open: true, message: 'Đã cập nhật số lượng!', severity: 'success' });
    } catch (err) {
      console.error('Error updating quantity:', err);
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || 'Không thể cập nhật số lượng. Vui lòng thử lại.',
        severity: 'error',
      });
    } finally {
      setUpdating({ ...updating, [productId]: false });
    }
  };

  const handleDeleteClick = (productId) => {
    const item = cartItems.find(i => i.productId === productId);
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    try {
      setUpdating({ ...updating, [itemToDelete.productId]: true });
      await http.delete(`/carts/items/${itemToDelete.productId}`);
      
      setCartItems(prevItems => prevItems.filter(item => item.productId !== itemToDelete.productId));
      setSnackbar({ open: true, message: 'Đã xóa sản phẩm khỏi giỏ hàng!', severity: 'success' });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (err) {
      console.error('Error deleting item:', err);
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || 'Không thể xóa sản phẩm. Vui lòng thử lại.',
        severity: 'error',
      });
    } finally {
      setUpdating({ ...updating, [itemToDelete?.productId]: false });
    }
  };

  const calculateTotal = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  }, [cartItems]);

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalPrice = calculateTotal();
  const currency = cartItems[0]?.currency || 'VND';

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{
                mb: 2,
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'grey.100',
                  color: 'primary.main',
                },
              }}
            >
              Quay lại
            </Button>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 3,
                borderRadius: 3,
                bgcolor: 'background.paper',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 32, color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                  Giỏ hàng của tôi
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {cartItems.length > 0 ? `${totalItems} sản phẩm trong giỏ hàng` : 'Giỏ hàng trống'}
                </Typography>
              </Box>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {cartItems.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 8,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: 'background.paper',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    bgcolor: 'grey.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <ShoppingCartIcon sx={{ fontSize: 60, color: 'grey.400' }} />
                </Box>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, color: 'text.primary' }}>
                  Giỏ hàng trống
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
                  Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/products')}
                  size="large"
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 700,
                    px: 5,
                    py: 1.5,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 6px 16px rgba(33,203,243,.35)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                      boxShadow: '0 10px 20px rgba(33,203,243,.45)',
                    },
                  }}
                >
                  Tiếp tục mua sắm
                </Button>
              </motion.div>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {/* Cart Items */}
              <Grid item xs={12} md={8}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    p: 3,
                    bgcolor: 'background.paper',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>
                      Sản phẩm ({cartItems.length})
                    </Typography>
                    <Chip
                      label={`${totalItems} sản phẩm`}
                      color="primary"
                      variant="outlined"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                  <Divider sx={{ mb: 3 }} />

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.productId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card
                          variant="outlined"
                          sx={{
                            borderRadius: 3,
                            overflow: 'hidden',
                            border: '1px solid',
                            borderColor: 'divider',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                              transform: 'translateY(-2px)',
                              borderColor: 'primary.light',
                            },
                          }}
                        >
                          <CardContent sx={{ p: 2.5 }}>
                            <Grid container spacing={2} alignItems="center">
                              {/* Image */}
                              <Grid item xs={12} sm={3}>
                                <CardMedia
                                  component="img"
                                  image={item.imageUrl || 'https://via.placeholder.com/150'}
                                  alt={item.productName}
                                  sx={{
                                    height: 140,
                                    width: '100%',
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => navigate(`/product/${item.productId}`)}
                                />
                              </Grid>

                              {/* Product Info */}
                              <Grid item xs={12} sm={5}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    cursor: 'pointer',
                                    '&:hover': { color: 'primary.main' },
                                  }}
                                  onClick={() => navigate(`/product/${item.productId}`)}
                                >
                                  {item.productName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  Giá: {formatCurrency(item.originPrice, item.currency)}
                                </Typography>
                                {item.messageDiscount && (
                                  <Chip
                                    label={item.messageDiscount}
                                    color="error"
                                    size="small"
                                    sx={{ mb: 1 }}
                                  />
                                )}
                              </Grid>

                              {/* Quantity Control */}
                              <Grid item xs={12} sm={2}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                    disabled={updating[item.productId] || item.quantity <= 1}
                                    sx={{
                                      border: '1px solid',
                                      borderColor: 'divider',
                                      '&:hover': { bgcolor: 'grey.100' },
                                    }}
                                  >
                                    <RemoveIcon fontSize="small" />
                                  </IconButton>
                                  <TextField
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const newQty = Math.max(1, parseInt(e.target.value) || 1);
                                      handleQuantityChange(item.productId, newQty);
                                    }}
                                    inputProps={{
                                      min: 1,
                                      style: { textAlign: 'center', width: 60 },
                                    }}
                                    size="small"
                                    disabled={updating[item.productId]}
                                  />
                                  <IconButton
                                    size="small"
                                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                    disabled={updating[item.productId]}
                                    sx={{
                                      border: '1px solid',
                                      borderColor: 'divider',
                                      '&:hover': { bgcolor: 'grey.100' },
                                    }}
                                  >
                                    <AddIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                                {updating[item.productId] && (
                                  <CircularProgress size={16} sx={{ mt: 1, ml: 1 }} />
                                )}
                              </Grid>

                              {/* Price and Delete */}
                              <Grid item xs={12} sm={2}>
                                <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                                  <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}
                                  >
                                    {formatCurrency(item.totalPrice, item.currency)}
                                  </Typography>
                                  <IconButton
                                    color="error"
                                    size="small"
                                    onClick={() => handleDeleteClick(item.productId)}
                                    disabled={updating[item.productId]}
                                    sx={{
                                      '&:hover': { bgcolor: 'error.light', color: 'white' },
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              {/* Order Summary */}
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    p: 3,
                    bgcolor: 'background.paper',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    position: { md: 'sticky' },
                    top: 100,
                    border: '2px solid',
                    borderColor: 'primary.light',
                    backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <ShoppingCartIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>
                      Tóm tắt đơn hàng
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                      Tổng sản phẩm:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {totalItems}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      Tạm tính:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {formatCurrency(totalPrice, currency)}
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Tổng cộng:
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                      {formatCurrency(totalPrice, currency)}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => navigate('/checkout')}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 700,
                      py: 1.5,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      boxShadow: '0 6px 16px rgba(33,203,243,.35)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                        boxShadow: '0 10px 20px rgba(33,203,243,.45)',
                      },
                    }}
                  >
                    Tiến hành thanh toán
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    onClick={() => navigate('/products')}
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 1.5,
                    }}
                  >
                    Tiếp tục mua sắm
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}
        </motion.div>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Xác nhận xóa</DialogTitle>
        <DialogContent dividers>
          <Typography>
            Bạn có chắc chắn muốn xóa sản phẩm "{itemToDelete?.productName}" khỏi giỏ hàng?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Hủy</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
            disabled={updating[itemToDelete?.productId]}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            borderRadius: 2,
          },
        }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            '& .MuiAlert-icon': {
              fontSize: 24,
            },
          }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

