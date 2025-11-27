import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Skeleton,
  Stack
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Inventory as InventoryIcon,
  LocalOffer as LocalOfferIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
  AttachMoney as AttachMoneyIcon,
  Inventory2 as Inventory2Icon,
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  CalendarToday as CalendarTodayIcon,
  Event as EventIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import http, { fetchProducts } from '../../api/http';

function formatCurrencyVnd(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value || 0));
}

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize] = useState(20);
  const [addOpen, setAddOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [ingredients, setIngredients] = useState([
    { name: '', amount: '', unit: '', description: '' }
  ]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'VND',
    quantity: '',
    productDate: '',
    expirationDate: '',
    manufacturerId: '',
    categoryId: '',
    usage: '',
    benefit: '',
    sideEffect: '',
    note: '',
    preserve: '',
    precription: 'false'
  });

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetchProducts(currentPage, pageSize);

      let list = [];
      let total = 0;
      
      if (response.code === 200) {
        list = response.data || [];
        total = response.totalElements || response.total || 0;
      } else if (Array.isArray(response.data)) {
        list = response.data;
        total = response.totalElements || response.total || list.length;
      } else if (Array.isArray(response)) {
        list = response;
        total = list.length;
      } else {
        setError(response.message || 'Không thể tải danh sách sản phẩm');
        return;
      }
      
      setProducts(Array.isArray(list) ? list : []);
      setTotalElements(total);

      if (total > 0) {
        const totalPages = Math.max(1, Math.ceil(Number(total) / pageSize));
        setHasNext(currentPage < totalPages - 1);
      } else {
        setHasNext(list.length === pageSize);
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Có lỗi xảy ra khi tải dữ liệu');
      console.error('Error loading products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);


  const handleRefresh = useCallback(() => {
    loadProducts();
  }, [loadProducts]);

  const handleOpenAdd = useCallback(() => setAddOpen(true), []);
  const handleCloseAdd = useCallback(() => { 
    if (!submitting) {
      setAddOpen(false);
      setImages([]);
      setIngredients([{ name: '', amount: '', unit: '', description: '' }]);
      setForm({
        name: '',
        description: '',
        price: '',
        currency: 'VND',
        quantity: '',
        productDate: '',
        expirationDate: '',
        manufacturerId: '',
        categoryId: '',
        usage: '',
        benefit: '',
        sideEffect: '',
        note: '',
        preserve: '',
        precription: 'false'
      });
    }
  }, [submitting]);
  
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);
  
  const handleImagesChange = useCallback((e) => {
    setImages(Array.from(e.target.files || []));
  }, []);
  const handleAddIngredient = useCallback(() => {
    setIngredients(prev => [...prev, { name: '', amount: '', unit: '', description: '' }]);
  }, []);

  const handleRemoveIngredient = useCallback((index) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleIngredientChange = useCallback((index, field, value) => {
    setIngredients(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  }, []);

  const formatDateForAPI = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const month = parseInt(parts[1], 10); 
      const day = parseInt(parts[2], 10); 
      return `${year}/${month}/${day}`;
    }
    return dateString;
  };

  const handleSubmitAdd = useCallback(async () => {
    try {
      setSubmitting(true);

      if (!form.name || !form.price) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc (Tên sản phẩm và Giá)');
        setSubmitting(false);
        return;
      }

      const filteredIngredients = ingredients
        .filter(ing => ing.name && ing.name.trim() !== '') 
        .map(ing => ({
          name: ing.name.trim(),
          amount: Number(ing.amount) || 0,
          unit: (ing.unit || '').trim(),
          description: (ing.description || '').trim()
        }));

      const ingredientsJson = JSON.stringify(filteredIngredients);

      const fd = new FormData();
      fd.append('name', form.name.trim());
      fd.append('description', (form.description || '').trim());
      fd.append('price', form.price);
      fd.append('currency', form.currency || 'VND');
      fd.append('quantity', form.quantity || '0');

      fd.append('productDate', formatDateForAPI(form.productDate));
      fd.append('expirationDate', formatDateForAPI(form.expirationDate));
      
      fd.append('manufacturerId', (form.manufacturerId || '').trim());
      fd.append('categoryId', (form.categoryId || '').trim());
      fd.append('usage', (form.usage || '').trim());
      fd.append('benefit', (form.benefit || '').trim());
      fd.append('sideEffect', (form.sideEffect || '').trim());
      fd.append('note', (form.note || '').trim());
      fd.append('preserve', (form.preserve || '').trim());
      fd.append('ingredients', ingredientsJson); 
      fd.append('precription', form.precription || 'false');

      images.forEach((f) => fd.append('images', f));

      const res = await http.post('/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      
      const created = res?.data?.data;
      if (created) {
        await loadProducts();
      }
      handleCloseAdd();
    } catch (e) {
      console.error('Create product error:', e);
      const errorMessage = e?.response?.data?.message || e?.response?.data?.error || 'Không thể tạo sản phẩm';
      const errorDetails = e?.response?.data?.errors;
      if (errorDetails && Array.isArray(errorDetails)) {
        alert(`${errorMessage}\n\nChi tiết:\n${errorDetails.map(err => `- ${err.field || err.defaultMessage || err}`).join('\n')}`);
      } else {
        alert(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  }, [form, images, ingredients, loadProducts, handleCloseAdd]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const q = searchTerm.toLowerCase();
    return products.filter((p) => {
      const name = (p.name || '').toLowerCase();
      const desc = (p.description || '').toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [products, searchTerm]);

  if (loading && products.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 3 }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <InventoryIcon />
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Quản lý Sản phẩm
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Xem và quản lý danh sách sản phẩm trong hệ thống
              </Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white', 
                borderRadius: 3,
                boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
                height: '100%'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        {loading ? <Skeleton width={60} /> : totalElements || products.length}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.95rem' }}>Tổng sản phẩm</Typography>
                    </Box>
                    <InventoryIcon sx={{ fontSize: 48, opacity: 0.9 }} />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
                color: 'white', 
                borderRadius: 3,
                boxShadow: '0 8px 16px rgba(79, 172, 254, 0.3)',
                height: '100%'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        {loading ? <Skeleton width={60} /> : products.filter(p => Number(p.discount || 0) > 0).length}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.95rem' }}>Đang giảm giá</Typography>
                    </Box>
                    <LocalOfferIcon sx={{ fontSize: 48, opacity: 0.9 }} />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', 
                color: 'white', 
                borderRadius: 3,
                boxShadow: '0 8px 16px rgba(67, 233, 123, 0.3)',
                height: '100%'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        {loading ? <Skeleton width={60} /> : products.reduce((s, p) => s + Number(p.soldQuantity || 0), 0).toLocaleString('vi-VN')}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.95rem' }}>Tổng đã bán</Typography>
                    </Box>
                    <TrendingUpIcon sx={{ fontSize: 48, opacity: 0.9 }} />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 3, 
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}
        >
          <Box sx={{ 
            p: 3, 
            borderBottom: '1px solid', 
            borderColor: 'divider', 
            background: 'linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%)'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', flex: 1 }}>
                <TextField
                  placeholder="Tìm kiếm sản phẩm theo tên hoặc mô tả..."
                  value={searchTerm}
                  onChange={handleSearch}
                  size="medium"
                  sx={{ 
                    minWidth: 320,
                    flex: 1,
                    maxWidth: 500,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'white',
                      '&:hover': {
                        backgroundColor: 'grey.50'
                      }
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                {searchTerm && (
                  <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Tìm thấy {filteredProducts.length} sản phẩm
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Tooltip title="Làm mới dữ liệu">
                  <IconButton 
                    onClick={handleRefresh} 
                    color="primary"
                    sx={{ 
                      bgcolor: 'primary.light',
                      '&:hover': { bgcolor: 'primary.main', color: 'white' }
                    }}
                    disabled={loading}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenAdd}
                  sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    borderRadius: 2,
                    px: 3,
                    py: 1.2,
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Thêm sản phẩm
                </Button>
              </Box>
            </Box>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                m: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  fontSize: 28
                }
              }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          {loading && products.length === 0 ? (
            <Box sx={{ p: 3 }}>
              <Stack spacing={2}>
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
                ))}
              </Stack>
            </Box>
          ) : filteredProducts.length === 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Hình ảnh</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Tên sản phẩm</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Mô tả</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Giá gốc</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Giảm giá</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Tồn kho</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Đã bán</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Đánh giá</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>NSX</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>HSD</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={10} align="center" sx={{ py: 8 }}>
                      <InventoryIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        {searchTerm ? 'Không tìm thấy sản phẩm nào' : 'Chưa có sản phẩm nào'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {searchTerm ? 'Thử thay đổi từ khóa tìm kiếm' : 'Danh sách sản phẩm trống'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Hình ảnh</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Tên sản phẩm</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Mô tả</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Giá gốc</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Giảm giá</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Tồn kho</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Đã bán</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Đánh giá</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>NSX</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', py: 2 }}>HSD</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.map((product, index) => (
                    <TableRow
                      key={product.id || `${product.name}-${index}`}
                      sx={{
                        '&:hover': {
                          bgcolor: 'grey.50',
                          transition: 'all 0.2s ease-in-out'
                        },
                        transition: 'all 0.2s ease-in-out'
                      }}
                    >
                      <TableCell>
                        <Avatar 
                          src={product.imageUrl} 
                          variant="rounded" 
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            borderRadius: 2
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {product.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            maxWidth: 300,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }} 
                          color="text.secondary"
                        >
                          {product.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AttachMoneyIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {formatCurrencyVnd(product.originPrice)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {product.discount && Number(product.discount) > 0 ? (
                          <Chip 
                            label={`-${product.discount}%`} 
                            color="error" 
                            size="small" 
                            sx={{ fontWeight: 600 }} 
                          />
                        ) : (
                          <Chip 
                            label="0%" 
                            size="small" 
                            variant="outlined" 
                            sx={{ fontWeight: 600 }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Inventory2Icon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {product.quantity?.toLocaleString('vi-VN') || 0}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <ShoppingCartIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {product.soldQuantity?.toLocaleString('vi-VN') || 0}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <StarIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {Number(product.ratingAvg || 0).toFixed(1)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {product.productDate || '-'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <EventIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {product.expirationDate || '-'}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}


          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: 2, 
            p: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: 'grey.50'
          }}>
            <Button 
              variant="outlined" 
              disabled={currentPage === 0 || loading} 
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            >
              Trang trước
            </Button>
            <Typography variant="body2">Trang {currentPage + 1}</Typography>
            <Button 
              variant="outlined" 
              disabled={!hasNext || loading} 
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Trang sau
            </Button>
          </Box>
        </Paper>
        <Dialog 
          open={addOpen} 
          onClose={handleCloseAdd} 
          maxWidth="md" 
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2
            }
          }}
        >
          <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
            Thêm sản phẩm mới
          </DialogTitle>
          <DialogContent dividers sx={{ maxHeight: '70vh', overflow: 'auto' }}>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              {/* Thông tin cơ bản */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                  Thông tin cơ bản
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Tên sản phẩm *" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  fullWidth 
                  required 
                  size="small"
                  placeholder="Nhập tên sản phẩm"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Giá *" 
                  name="price" 
                  type="number" 
                  value={form.price} 
                  onChange={handleChange} 
                  fullWidth 
                  required 
                  size="small"
                  placeholder="Nhập giá sản phẩm"
                  InputProps={{
                    endAdornment: <Typography variant="caption" sx={{ mr: 1 }}>{form.currency}</Typography>
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Mô tả" 
                  name="description" 
                  value={form.description} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline 
                  rows={2} 
                  size="small"
                  placeholder="Nhập mô tả sản phẩm"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField 
                  select 
                  label="Tiền tệ" 
                  name="currency" 
                  value={form.currency} 
                  onChange={handleChange} 
                  fullWidth 
                  size="small"
                >
                  <MenuItem value="VND">VND</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField 
                  label="Số lượng" 
                  name="quantity" 
                  type="number" 
                  value={form.quantity} 
                  onChange={handleChange} 
                  fullWidth 
                  size="small"
                  placeholder="Nhập số lượng"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField 
                  select 
                  label="Precription" 
                  name="precription" 
                  value={form.precription} 
                  onChange={handleChange} 
                  fullWidth 
                  size="small"
                >
                  <MenuItem value="true">Có</MenuItem>
                  <MenuItem value="false">Không</MenuItem>
                </TextField>
              </Grid>

              {/* Ngày tháng */}
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                  Ngày tháng
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Ngày sản xuất" 
                  name="productDate" 
                  type="date"
                  value={form.productDate} 
                  onChange={handleChange} 
                  fullWidth 
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Hạn sử dụng" 
                  name="expirationDate" 
                  type="date"
                  value={form.expirationDate} 
                  onChange={handleChange} 
                  fullWidth 
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* ID */}
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                  ID liên kết
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Manufacturer ID" 
                  name="manufacturerId" 
                  value={form.manufacturerId} 
                  onChange={handleChange} 
                  fullWidth 
                  size="small"
                  placeholder="Nhập UUID của nhà sản xuất"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Category ID" 
                  name="categoryId" 
                  value={form.categoryId} 
                  onChange={handleChange} 
                  fullWidth 
                  size="small"
                  placeholder="Nhập UUID của danh mục"
                />
              </Grid>

              {/* Thông tin chi tiết */}
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                  Thông tin chi tiết
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Cách dùng (usage)" 
                  name="usage" 
                  value={form.usage} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline
                  rows={2}
                  size="small"
                  placeholder="Hướng dẫn cách sử dụng sản phẩm"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Công dụng (benefit)" 
                  name="benefit" 
                  value={form.benefit} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline
                  rows={2}
                  size="small"
                  placeholder="Mô tả công dụng của sản phẩm"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Tác dụng phụ (sideEffect)" 
                  name="sideEffect" 
                  value={form.sideEffect} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline
                  rows={2}
                  size="small"
                  placeholder="Mô tả tác dụng phụ (nếu có)"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Ghi chú (note)" 
                  name="note" 
                  value={form.note} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline
                  rows={2}
                  size="small"
                  placeholder="Ghi chú thêm về sản phẩm"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Bảo quản (preserve)" 
                  name="preserve" 
                  value={form.preserve} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline
                  rows={2}
                  size="small"
                  placeholder="Hướng dẫn bảo quản sản phẩm"
                />
              </Grid>

              {/* Ingredients */}
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    Thành phần (Ingredients)
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleAddIngredient}
                    sx={{ minWidth: 'auto' }}
                  >
                    Thêm thành phần
                  </Button>
                </Box>
                <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2, bgcolor: 'grey.50' }}>
                  {ingredients.map((ingredient, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                          Thành phần {index + 1}
                        </Typography>
                        {ingredients.length > 1 && (
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleRemoveIngredient(index)}
                            sx={{ minWidth: 'auto', width: 32, height: 32 }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                      <Grid container spacing={1.5}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Tên thành phần"
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            fullWidth
                            size="small"
                            placeholder="Ví dụ: Paracetamol"
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            label="Số lượng"
                            type="number"
                            value={ingredient.amount}
                            onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                            fullWidth
                            size="small"
                            placeholder="500"
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            label="Đơn vị"
                            value={ingredient.unit}
                            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                            fullWidth
                            size="small"
                            placeholder="mg, ml, g..."
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Mô tả"
                            value={ingredient.description}
                            onChange={(e) => handleIngredientChange(index, 'description', e.target.value)}
                            fullWidth
                            multiline
                            rows={1}
                            size="small"
                            placeholder="Mô tả về thành phần này"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                  {ingredients.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                      Chưa có thành phần nào. Nhấn "Thêm thành phần" để thêm.
                    </Typography>
                  )}
                </Box>
              </Grid>

              {/* Hình ảnh */}
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                  Hình ảnh
                </Typography>
                <Button variant="outlined" component="label" size="small" startIcon={<AddIcon />}>
                  Chọn ảnh (nhiều ảnh)
                  <input type="file" hidden multiple accept="image/*" onChange={handleImagesChange} />
                </Button>
                <Typography variant="caption" sx={{ ml: 2, color: images.length ? 'success.main' : 'text.secondary' }}>
                  {images.length ? `${images.length} file đã chọn` : 'Chưa chọn ảnh'}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={handleCloseAdd} 
              disabled={submitting}
            >
              Hủy
            </Button>
            <Button 
              onClick={handleSubmitAdd} 
              variant="contained" 
              disabled={submitting}
            >
              {submitting ? <CircularProgress size={20} color="inherit" /> : 'Tạo sản phẩm'}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default AdminProducts;


