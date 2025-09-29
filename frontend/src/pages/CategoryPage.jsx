import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Rating,
  Button,
  Breadcrumbs,
  Link,
  Skeleton,
  useTheme,
  useMediaQuery
} from '@mui/material';


const readableTitle = (slug) =>
  decodeURIComponent(slug || '')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ');

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const title = useMemo(() => readableTitle(slug), [slug]);

  const getDemoProducts = (name) => {
    const base = [
      {
        id: 101,
        name: `${name} – Thuốc` ,
        price: 80000,
        originalPrice: '100.000',
        discount: 20,
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
          rating: 5.0,
        reviews: 200
      },
      {
        id: 102,
        name: `${name} – Thuốc`,
        price: 80000,
        originalPrice: '100.000',
        discount: 20,
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
        rating: 5.0,
        reviews: 200
      },
      {
        id:103,
        name: `${name} – Thuốc`,
        price: 80000,
        originalPrice: '100.000',
        discount: 20,
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
        rating: 5.0,
        reviews: 200
      },
      {
        id: 104,
        name: `${name} – Thuốc`,
        price: 80000,
              originalPrice: '100.000',
          discount: 20,
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
        rating: 5.0,
        reviews: 200
      },
      {
        id: 105,
        name: `${name} – Thuốc`,
        price: 80000,
        originalPrice: '100.000',
        discount: 20,
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
        rating: 5.0,
        reviews: 200
      },
      {
        id: 106,
        name: `${name} – Thuốc`,
        price: 80000,
        originalPrice: '100.000',
        discount: 20,
          imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
        rating: 5.0,
        reviews: 200
      },
      {
        id: 107,
        name: `${name} – Thuốc`,
        price: 80000,
        originalPrice: '100.000',
        discount: 20,
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
        rating: 5.0,
          reviews: 200
      },
      {
        id: 108,
          name: `${name} – Thuốc`,
        price: 80000,
        originalPrice: '100.000',
        discount: 20,
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
        rating: 5.0,
        reviews: 200
      }
    ];
    return base;
  };
  const products = useMemo(() => getDemoProducts(title), [title]);

  return (
    <Box sx={{ py: 6, bgcolor: 'grey.50', minHeight: '60vh' }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 3 }} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" onClick={() => navigate('/') } sx={{ cursor: 'pointer' }}>
            Trang chủ
          </Link>
          <Typography color="text.primary">{title}</Typography>
        </Breadcrumbs>

        <Box sx={{ mb: 3 }}>
          <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Danh sách sản phẩm liên quan đến "{title}".
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {products.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={product.id || index}>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <Card sx={{ height: '100%', borderRadius: 3, overflow: 'hidden', '&:hover': { boxShadow: theme.shadows[10], transform: 'translateY(-6px)' }, transition: 'all .3s ease', cursor: 'pointer' }} onClick={() => {
                      const id = product.id || product.productId;
                      if (id) {
                        navigate(`/product/${id}`);
                      }
                    }}>
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                                image={product.imageUrl || product.image || 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop'}
                          alt={product.name}
                          sx={{ height: 180, objectFit: 'cover' }}
                        />
                        {product.discount && (
                          <Chip label={`-${product.discount}%`} color="error" size="small" sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 'bold' }} />
                        )}
                      </Box>
                      <CardContent sx={{ p: 2.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
                          {product.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Rating value={Number(product.rating) || 4.5} precision={0.1} readOnly size="small" />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({product.reviews || product.reviewCount || 0})
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {product.price?.toLocaleString?.('vi-VN') || product.price || 'Liên hệ'}
                          </Typography>
                          {product.originalPrice && (
                            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                              {product.originalPrice}
                            </Typography>
                          )}
                        </Box>
                        <Button fullWidth variant="contained">Thêm vào giỏ</Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
        </Grid>
      </Container>
    </Box>
  );
}


