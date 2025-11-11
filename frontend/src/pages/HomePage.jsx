import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Rating,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  Phone as PhoneIcon,
  LocalShipping as LocalShippingIcon,
  Security as SecurityIcon,
  CreditCard as CreditCardIcon,
  Headset as HeadsetIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 101,
      name: 'Thuốc',
      price: '80.000',
      originalPrice: '100.000',
      discount: '20%',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crophttps://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
      rating: 5.0,
      reviews: 200
    },
    {
      id: 102,
      name: 'Thuốc',
      price: '80.000',
      originalPrice: '100.000',
      discount: '20%',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crophttps://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
      rating: 5.0,
      reviews: 200
    },
    {
      id: 103,
      name: 'Thuốc',
      price: '80.000',
      originalPrice: '100.000',
      discount: '20%',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crophttps://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
      rating: 5.0,
      reviews: 200



    },
    {
      id: 104,
      name: 'Thuốc',
      price: '80.000',
      originalPrice: '100.000',
      discount: '20%',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crophttps://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop',
      rating: 5.0,
      reviews: 200
    }
  ];

  const categories = [
    { name: 'Thần kinh não', icon: '🧠', count: '100+' },
    { name: 'Vitamin & Khoáng chất', icon: '🧪', count: '100+' },
    { name: 'Sức khoẻ tim mạch', icon: '❤️‍🩹', count: '100+' },
    { name: 'Tiêm Vắc Xin', icon: '🛡️', count: '100+' },
    // { name: 'Hỗ trợ tiêu hoá', icon: '🥗', count: '100+' },
    { name: 'Sinh lý – Nội tiết tố', icon: '🧬', count: '100+' },
    { name: 'Dinh dưỡng', icon: '🥗', count: '100+' },
    // { name: 'Thuốc bổ', icon: '💊', count: '100+' },
    // { name: 'Chăm sóc da mặt', icon: '🧖', count: '100+' },
    { name: 'Hỗ trợ làm đẹp', icon: '💅', count: '100+' },
    { name: 'Hỗ trợ tình dục', icon: '❤️', count: '100+' },
    { name: 'Tư vấn với Bác Sĩ', icon: '👨‍⚕️', count: '100+' }
  ];

  const services = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Giao hàng miễn phí',
      description: 'Giao hàng miễn phí cho đơn hàng từ 500k'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Chất lượng đảm bảo',
      description: '100% sản phẩm chính hãng, có giấy phép'
    },
    {
      icon: <CreditCardIcon sx={{ fontSize: 40 }} />,
      title: 'Thanh toán an toàn',
      description: 'Hỗ trợ nhiều phương thức thanh toán'
    },
    {
      icon: <HeadsetIcon sx={{ fontSize: 40 }} />,
      title: 'Hỗ trợ 24/7',
      description: 'Tư vấn chuyên môn miễn phí'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box
        sx={{
          position: 'relative',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 10 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant={isMobile ? 'h3' : 'h2'}
                  component="h1"
                  sx={{ fontWeight: 'bold', mb: 3, lineHeight: 1.2 }}
                >
                  Sức khỏe của bạn
                  <Box component="span" sx={{ display: 'block', color: 'warning.main' }}>
                    Là ưu tiên hàng đầu
                  </Box>
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, color: 'grey.100', lineHeight: 1.6 }}>
                  MedStore - Nơi cung cấp các sản phẩm chăm sóc sức khỏe chất lượng cao, 
                  với đội ngũ bác sĩ chuyên môn tư vấn 24/7.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        bgcolor: 'warning.main',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: 'warning.dark' }
                      }}
                    >
                      Mua sắm ngay
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<PhoneIcon />}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'white',
                          color: 'primary.main'
                        }
                      }}
                    >
                      Tư vấn miễn phí
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ position: 'relative' }}
              >
                <Box sx={{ position: 'relative', zIndex: 10 }}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: theme.shadows[20]
                    }}
                  >
                    <CardMedia
                      component="img"
                      image="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crophttps://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=500&fit=crop"
                      alt="Healthcare products"
                      sx={{ height: 400 }}
                    />
                  </Card>
                </Box>
                <Paper
                  sx={{
                    position: 'absolute',
                    bottom: -16,
                    right: -16,
                    p: 3,
                    borderRadius: 4,
                    boxShadow: theme.shadows[10],
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    50K+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Khách hàng tin tưởng
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 10, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: theme.spacing(8) }}
          >
            <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
              Danh mục sản phẩm
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Khám phá đa dạng sản phẩm chăm sóc sức khỏe chất lượng cao
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {categories.map((category, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.shadows[10],
                        transform: 'translateY(-10px)'
                      }
                    }}
                    onClick={() => {
                      if (category.name.toLowerCase() === 'tư vấn với bác sĩ') {
                        navigate('/consult');
                      } else {
                        const slug = category.name
                          .trim()
                          .replace(/\s+/g, '-');
                        navigate(`/category/${encodeURIComponent(slug)}`);
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Typography variant="h1" sx={{ mb: 2, fontSize: '4rem' }}>
                        {category.icon}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 1 }}>
                        {category.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {category.count} sản phẩm
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          Xem tất cả
                        </Typography>
                        <ArrowForwardIcon sx={{ ml: 1, fontSize: '1rem' }} />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: theme.spacing(8) }}
          >
            <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
              Sản phẩm nổi bật
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Những sản phẩm được khách hàng tin tưởng và đánh giá cao
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {featuredProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                      <Card
                    sx={{
                      height: '100%',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.shadows[10],
                        transform: 'translateY(-10px)'
                      }
                        }}
                        onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{ height: 200, objectFit: 'cover' }}
                      />
                      <Chip
                        label={`-${product.discount}`}
                        color="error"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          fontWeight: 'bold'
                        }}
                      />
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          bgcolor: 'white',
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                      >
                        <FavoriteIcon sx={{ color: 'grey.400' }} />
                      </IconButton>
                    </Box>
                    
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 2, lineHeight: 1.3 }}>
                        {product.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={product.rating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          ({product.reviews})
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                          {product.price}đ
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                          {product.originalPrice}đ
                        </Typography>
                      </Box>
                      
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                          bgcolor: 'primary.main',
                          '&:hover': { bgcolor: 'primary.dark' }
                        }}
                      >
                        Thêm vào giỏ
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 10, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: theme.spacing(8) }}
          >
            <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
              Tại sao chọn MedStore?
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        color: 'primary.main',
                        boxShadow: theme.shadows[4],
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.1)' }
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 2 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 10, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
              Sẵn sàng chăm sóc sức khỏe?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: 'grey.100', maxWidth: 600, mx: 'auto' }}>
              Tham gia cùng hàng nghìn khách hàng đã tin tưởng MedStore 
              để chăm sóc sức khỏe gia đình
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'warning.main',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: 'warning.dark' }
                  }}
                >
                  Bắt đầu mua sắm
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'white',
                      color: 'primary.main'
                    }
                  }}
                >
                  Liên hệ tư vấn
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
