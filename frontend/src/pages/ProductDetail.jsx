import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Chip,
  Rating,
  Button,
  Paper,
  Divider,
  ImageList,
  ImageListItem,
  Skeleton,
  TextField,
  useTheme,
  useMediaQuery
} from '@mui/material';


export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [product] = useState(() => ({
    id,
    name: 'Sản phẩm demo ' + id,
    price: 80000,
    originalPrice: 100000,
    discount: 20,
    rating: 5.0,
    reviews: 200,
    category: 'Thuốc',
    brand: 'MedStore',
    origin: 'Việt Nam',
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop'
    ],
    description: 'Mô tả ngắn về sản phẩm .',
    longDescription: 'Đây là mô tả chi tiết của sản phẩm .'
  }));
  const [qty, setQty] = useState(1);

  const images = useMemo(() => {
    const all = [product.imageUrl || product.image].filter(Boolean);
    if (product.images && Array.isArray(product.images)) all.push(...product.images);
    return all.length ? all : ['https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop'];
  }, [product]);

  return (
    <Box sx={{ bgcolor: 'grey.50', py: 4, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 3 }} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            Trang chủ
          </Link>
          <Typography color="text.primary">Chi tiết sản phẩm</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
                <Box sx={{ borderRadius: 3, overflow: 'hidden', mb: 2 }}>
                  <img
                    src={images[0]}
                    alt={product?.name}
                    style={{ width: '100%', height: 360, objectFit: 'cover' }}
                  />
                </Box>
                {images.length > 1 && (
                  <ImageList cols={4} gap={8} sx={{ m: 0 }}>
                    {images.slice(1, 9).map((src, i) => (
                      <ImageListItem key={i}>
                        <img src={src} alt={`thumb-${i}`} loading="lazy" style={{ height: 72, objectFit: 'cover', width: '100%' }} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}
              </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
              <>
                <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', mb: 1 }}>
                  {product?.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Rating value={Number(product?.rating) || 4.6} readOnly precision={0.1} size="small" />
                  <Typography variant="body2" color="text.secondary">({product?.reviews || 0} đánh giá)</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {product?.price?.toLocaleString?.('vi-VN') || product?.price || 'Liên hệ'}
                  </Typography>
                  {product?.originalPrice && (
                    <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                      {product.originalPrice}
                    </Typography>
                  )}
                  {product?.discount && <Chip label={`-${product.discount}%`} color="error" />}
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
                  {product?.description || 'Sản phẩm chăm sóc sức khỏe chất lượng cao từ MedStore.'}
                </Typography>

                <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                  <Grid item>
                    <TextField
                      type="number"
                      size="small"
                      label="Số lượng"
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                      inputProps={{ min: 1, style: { width: 80 } }}
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" size="large">Thêm vào giỏ</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" size="large">Mua ngay</Button>
                  </Grid>
                </Grid>

                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Thông tin thêm</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Danh mục</Typography>
                      <Typography variant="body1">{product?.category || 'Khác'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Thương hiệu</Typography>
                      <Typography variant="body1">{product?.brand || 'Đang cập nhật'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Tồn kho</Typography>
                      <Typography variant="body1">{product?.stock ?? '—'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Xuất xứ</Typography>
                      <Typography variant="body1">{product?.origin || '—'}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Mô tả chi tiết</Typography>
          {
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                {product?.longDescription || product?.description || 'Đang cập nhật nội dung chi tiết sản phẩm.'}
              </Typography>
            </Paper>
          }
        </Box>
      </Container>
    </Box>
  );
}


