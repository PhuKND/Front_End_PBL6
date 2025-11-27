import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  useMediaQuery,
  Tabs,
  Tab,
  Link
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  LocalPharmacy as LocalPharmacyIcon,
  VolunteerActivism as VolunteerActivismIcon,
  Assignment as AssignmentIcon,
  Place as PlaceIcon,
  FlashOn as FlashIcon,
  AccessTime as TimeIcon,
  Whatshot as FireIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Verified as VerifiedIcon,
  LocalShipping as LocalShippingIcon,
  SupportAgent as SupportAgentIcon,
  EmojiEvents as TrophyIcon
} from '@mui/icons-material';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const flashSaleScrollRef = useRef(null);
  const bestSellerScrollRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [flashSaleTab, setFlashSaleTab] = useState(0);
  const [countdown, setCountdown] = useState({ hours: 10, minutes: 12, seconds: 53 });

  const heroSlides = [
    {
      id: 1,
      title: 'Dự phòng chủ động – Tương lai vững vàng cùng MedStore',
      subtitle: 'Khuyến mãi áp dụng: Vắc xin phòng HPV (Gardasil 9), Não mô cầu, Sốt xuất huyết',
      primaryLabel: 'Cần mua thuốc',
      secondaryLabel: 'Tư vấn với dược sĩ',
      imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop'
    },
    {
      id: 2,
      title: 'Chăm sóc sức khỏe toàn diện cho gia đình bạn',
      subtitle: 'Sản phẩm chính hãng, tư vấn chuyên môn 24/7, giao hàng nhanh chóng',
      primaryLabel: 'Xem sản phẩm',
      secondaryLabel: 'Đặt lịch tư vấn',
      imageUrl: 'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2022/11/26/1-1669446826662408058367.png'
    },
    {
      id: 3,
      title: 'Ưu đãi đặc biệt - Giảm giá lên đến 50%',
      subtitle: 'Flash sale hàng ngày với hàng ngàn sản phẩm chất lượng cao',
      primaryLabel: 'Mua ngay',
      secondaryLabel: 'Xem ưu đãi',
      imageUrl: 'https://www.vascara.com/uploads/web/900/Khuyen-Mai/black-friday-uu-dai-len-den-50-tat-ca-san-pham-duoc-ap-dung-vip.gif'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    {
      id: 1,
      icon: <LocalPharmacyIcon sx={{ fontSize: 40 }} />,
      title: 'Cần mua thuốc',
    //   description: 'Tìm kiếm và đặt mua thuốc nhanh chóng',
      route: '/products'
    },
    {
      id: 2,
      icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
      title: 'Tư vấn với dược sĩ',
    //   description: 'Nhận tư vấn chuyên môn miễn phí',
      route: '/consult'
    },
    {
      id: 3,
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      title: 'Đơn của tôi',
    //   description: 'Theo dõi đơn hàng và lịch sử mua sắm',
      route: '/orders'
    },
    {
      id: 4,
      icon: <PlaceIcon sx={{ fontSize: 40 }} />,
      title: 'Tìm nhà thuốc',
    //   description: 'Tìm cơ sở y tế gần bạn nhất',
      route: '/'
    }
  ];

  const featuredCategories = [
    { id: 1, slug: 'than-kinh-nao', name: 'Thần kinh não', productCount: 57 },
    { id: 2, slug: 'vitamin-khoang-chat', name: 'Vitamin & Khoáng chất', productCount: 113 },
    { id: 3, slug: 'suc-khoe-tim-mach', name: 'Sức khoẻ tim mạch', productCount: 23 },
    { id: 4, slug: 'tang-suc-de-khang', name: 'Tăng sức đề kháng, miễn dịch', productCount: 39 },
    { id: 5, slug: 'ho-tro-tieu-hoa', name: 'Hỗ trợ tiêu hóa', productCount: 68 },
    { id: 6, slug: 'sinh-ly-noi-tiet-to', name: 'Sinh lý - Nội tiết tố', productCount: 42 },
    { id: 7, slug: 'dinh-duong', name: 'Dinh dưỡng', productCount: 37 },
    { id: 8, slug: 'ho-tro-dieu-tri', name: 'Hỗ trợ điều trị', productCount: 125 },
    { id: 9, slug: 'giai-phap-lan-da', name: 'Giải pháp làn da', productCount: 88 },
    { id: 10, slug: 'cham-soc-da-mat', name: 'Chăm sóc da mặt', productCount: 197 },
    { id: 11, slug: 'ho-tro-lam-dep', name: 'Hỗ trợ làm đẹp', productCount: 22 },
    { id: 12, slug: 'ho-tro-tinh-duc', name: 'Hỗ trợ tình dục', productCount: 41 }
  ];

  const flashSaleProducts = [
    {
      id: 201,
      name: 'Mặt nạ cấp ẩm Banobagi Stem Cell Vitamin Mask dưỡng da trắng sáng',
      price: '218.400',
      originalPrice: '280.000',
      discount: 22,
      unit: 'Hộp',
      packaging: 'Hộp x 1',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'
    },
    {
      id: 202,
      name: 'Kem dưỡng ẩm Vichy Collagen Liftactiv Collagen Specialist',
      price: '982.800',
      originalPrice: '1.260.000',
      discount: 22,
      unit: 'Hộp',
      packaging: 'Hộp x 1',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop'
    },
    {
      id: 203,
      name: 'Serum Vichy Liftactiv B3 Serum chống lão hóa',
      price: '998.400',
      originalPrice: '1.280.000',
      discount: 22,
      unit: 'Hộp',
      packaging: 'Hộp x 1',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'
    },
    {
      id: 204,
      name: 'Kem dưỡng SVR Cicavit+ phục hồi da',
      price: '260.520',
      originalPrice: '334.000',
      discount: 22,
      unit: 'Hộp',
      packaging: 'Hộp x 1',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop'
    },
    {
      id: 205,
      name: 'Mặt nạ Super Aqua Mask Pack cấp ẩm sâu',
      price: '171.600',
      originalPrice: '220.000',
      discount: 22,
      unit: 'Hộp',
      packaging: 'Hộp x 1',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'
    },
    {
      id: 206,
      name: 'Mặt nạ Real Retinol Mask Pack chống lão hóa',
      price: '171.600',
      originalPrice: '220.000',
      discount: 22,
      unit: 'Hộp',
      packaging: 'Hộp x 1',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop'
    }
  ];

  const bestSellingProducts = [
    {
      id: 301,
      name: 'Thực phẩm bảo vệ sức khỏe NMN PQQ',
      price: '6.675.000',
      originalPrice: '8.900.000',
      discount: 25,
      unit: 'Hộp',
      packaging: 'Hộp 60 Viên',
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop'
    },
    {
      id: 302,
      name: 'Viên uống Best King Jpanwell hỗ trợ tăng cường sinh lý và khả năng',
      price: '1.040.000',
      originalPrice: '1.300.000',
      discount: 20,
      unit: 'Hộp',
      packaging: 'Hộp 60 Viên',
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop'
    },
    {
      id: 303,
      name: 'Viên uống giảm ho Nano Anpacov Biochempha',
      price: '119.200',
      originalPrice: '149.000',
      discount: 20,
      unit: 'Hộp',
      packaging: 'Hộp 60 Viên',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop'
    },
    {
      id: 304,
      name: 'Viên nhai Brauer Baby & Kids Ultra Pure DHA hỗ trợ phát triển não',
      price: '388.800',
      originalPrice: '486.000',
      discount: 20,
      unit: 'Hộp',
      packaging: 'Hộp 60 viên',
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop'
    },
    {
      id: 305,
      name: 'Nước Yến Sào Cao Cấp Nunest Relax - Ngủ Ngon, Giảm Căng thẳng',
      price: '246.750',
      originalPrice: '329.000',
      discount: 25,
      unit: 'Hộp',
      packaging: 'Hộp 6 Hũ x 70ml',
      rating: 4.5,
      reviews: 278,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop'
    },
    {
      id: 306,
      name: 'Chai xịt Aloclair Plus Spray giảm đau nhanh bệnh tay chân miệng',
      price: '229.000',
      originalPrice: null,
      discount: null,
      unit: 'Hộp',
      packaging: 'Hộp x 15ml',
      rating: 4.4,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop'
    }
  ];

  const flashSaleSessions = [
    { label: '08:00 - 22:00, Hôm nay', status: 'Đang diễn ra' },
    { label: '08:00 - 22:00, Ngày mai', status: 'Sắp diễn ra' },
    { label: '08:00 - 22:00, Ngày kia', status: 'Sắp diễn ra' }
  ];

  const scrollFlashSale = (direction) => {
    if (flashSaleScrollRef.current) {
      flashSaleScrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  const scrollBestSeller = (direction) => {
    if (bestSellerScrollRef.current) {
      bestSellerScrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Banner / Slider */}
      <Box
        sx={{
          position: 'relative',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          overflow: 'hidden',
          minHeight: { xs: 400, md: 500 }
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', py: { xs: 4, md: 8 } }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={7}>
                  <Typography
                    variant={isMobile ? 'h4' : 'h3'}
                    sx={{ fontWeight: 'bold', mb: 2, lineHeight: 1.2 }}
                  >
                    {heroSlides[currentSlide].title}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                    {heroSlides[currentSlide].subtitle}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate('/products')}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        fontWeight: 'bold',
                        px: 4,
                        '&:hover': { bgcolor: 'grey.100' }
                      }}
                    >
                      {heroSlides[currentSlide].primaryLabel}
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/consult')}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        fontWeight: 'bold',
                        px: 4,
                        '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                      }}
                    >
                      {heroSlides[currentSlide].secondaryLabel}
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: theme.shadows[20]
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={heroSlides[currentSlide].imageUrl}
                      alt={heroSlides[currentSlide].title}
                      sx={{ height: { xs: 250, md: 350 }, objectFit: 'cover' }}
                    />
                  </Card>
                </Grid>
              </Grid>
            </motion.div>
          </AnimatePresence>

          {/* Slider indicators */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
            {heroSlides.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentSlide(index)}
                sx={{
                  width: currentSlide === index ? 32 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </Box>

          {/* Navigation arrows */}
          <IconButton
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            sx={{
              position: 'absolute',
              left: { xs: 8, md: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            sx={{
              position: 'absolute',
              right: { xs: 8, md: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Container>
      </Box>

      {/* Quick Action Cards */}
      <Box sx={{ py: 4, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {quickActions.map((action, index) => (
              <Grid item xs={6} sm={6} md={3} key={action.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    onClick={() => navigate(action.route)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      textAlign: 'center',
                      p: 3,
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8]
                      }
                    }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {action.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Categories Section */}
      <Box sx={{ py: 6, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <TrophyIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Danh mục nổi bật
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {featuredCategories.map((category, index) => (
                <Grid item xs={6} sm={4} md={2} key={category.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card
                      onClick={() => navigate(`/category/${category.slug}`)}
                      sx={{
                        height: '100%',
                        cursor: 'pointer',
                        textAlign: 'center',
                        p: 3,
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.shadows[8],
                          bgcolor: 'primary.light',
                          color: 'white'
                        }
                      }}
                    >
                      <LocalPharmacyIcon
                        sx={{
                          fontSize: 48,
                          color: 'primary.main',
                          mb: 2,
                          '&:parent:hover': { color: 'white' }
                        }}
                      />
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {category.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {category.productCount} sản phẩm
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Flash Sale Section */}
      <Box sx={{ py: 6, bgcolor: '#E3F2FD', position: 'relative' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      color: '#FFA726',
                      fontSize: { xs: '1.5rem', md: '2rem' }
                    }}
                  >
                    FLASH SALE
                  </Typography>
                  <FlashIcon sx={{ fontSize: 32, color: '#FFA726' }} />
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                      fontSize: { xs: '1.5rem', md: '2rem' }
                    }}
                  >
                    giá tốt
                  </Typography>
                </Box>
              </Box>
              <Link
                href="#"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Xem thể lệ &gt;
              </Link>
            </Box>

            {/* Schedule Tabs */}
            <Paper sx={{ p: 2, mb: 3, bgcolor: 'white' }}>
              <Tabs
                value={flashSaleTab}
                onChange={(e, newValue) => setFlashSaleTab(newValue)}
                sx={{
                  '& .MuiTab-root': {
                    minWidth: { xs: 100, md: 150 },
                    fontSize: '0.875rem',
                    fontWeight: 500
                  },
                  '& .Mui-selected': {
                    color: '#D32F2F',
                    fontWeight: 'bold'
                  }
                }}
              >
                {flashSaleSessions.map((session, index) => (
                  <Tab
                    key={index}
                    label={
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: flashSaleTab === index ? 'bold' : 'normal' }}>
                          {session.label}
                        </Typography>
                        <Typography variant="caption" sx={{ color: flashSaleTab === index ? '#D32F2F' : 'text.secondary' }}>
                          {session.status}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Paper>

            {/* Countdown Timer */}
            <Paper
              sx={{
                p: 2,
                mb: 4,
                bgcolor: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimeIcon sx={{ color: '#D32F2F' }} />
                <Typography variant="body2" fontWeight="bold">
                  Kết thúc sau:
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Chip
                  label={String(countdown.hours).padStart(2, '0')}
                  sx={{
                    bgcolor: '#D32F2F',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    minWidth: 50,
                    height: 36
                  }}
                />
                <Typography sx={{ fontWeight: 'bold', color: '#D32F2F' }}>:</Typography>
                <Chip
                  label={String(countdown.minutes).padStart(2, '0')}
                  sx={{
                    bgcolor: '#D32F2F',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    minWidth: 50,
                    height: 36
                  }}
                />
                <Typography sx={{ fontWeight: 'bold', color: '#D32F2F' }}>:</Typography>
                <Chip
                  label={String(countdown.seconds).padStart(2, '0')}
                  sx={{
                    bgcolor: '#D32F2F',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    minWidth: 50,
                    height: 36
                  }}
                />
              </Box>
            </Paper>

            {/* Flash Sale Products Carousel */}
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={() => scrollFlashSale('left')}
                sx={{
                  position: 'absolute',
                  left: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'white',
                  boxShadow: theme.shadows[4],
                  zIndex: 2,
                  display: { xs: 'none', md: 'flex' },
                  '&:hover': { bgcolor: 'grey.100' }
                }}
              >
                <ChevronLeftIcon />
              </IconButton>

              <Box
                ref={flashSaleScrollRef}
                sx={{
                  display: 'flex',
                  gap: 2,
                  overflowX: 'auto',
                  pb: 2,
                  scrollBehavior: 'smooth',
                  '&::-webkit-scrollbar': { height: 8 },
                  '&::-webkit-scrollbar-thumb': {
                    bgcolor: 'grey.400',
                    borderRadius: 4
                  }
                }}
              >
                {flashSaleProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    style={{ minWidth: 280 }}
                  >
                    <Card
                      onClick={() => navigate(`/product/${product.id}`)}
                      sx={{
                        height: '100%',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        bgcolor: 'white',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.shadows[8]
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          image={product.image}
                          alt={product.name}
                          sx={{ height: 200, objectFit: 'cover' }}
                        />
                        <Chip
                          label={`-${product.discount}%`}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            bgcolor: '#D32F2F',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.875rem',
                            height: 28
                          }}
                        />
                      </Box>
                      <CardContent sx={{ p: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            mb: 1.5,
                            height: 40,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: 1.4
                          }}
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 'bold',
                            color: theme.palette.primary.main,
                            mb: 0.5,
                            fontSize: '1.1rem'
                          }}
                        >
                          {product.price}₫ / {product.unit}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            textDecoration: 'line-through',
                            mb: 1.5
                          }}
                        >
                          {product.originalPrice}₫
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            bgcolor: '#FFE0B2',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            mb: 1.5,
                            width: 'fit-content'
                          }}
                        >
                          <FireIcon sx={{ fontSize: 16, color: '#FF9800' }} />
                          <Typography variant="caption" sx={{ color: '#E65100', fontWeight: 'bold' }}>
                            Ưu đãi giá sốc
                          </Typography>
                        </Box>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': { bgcolor: theme.palette.primary.dark }
                          }}
                        >
                          Chọn mua
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>

              <IconButton
                onClick={() => scrollFlashSale('right')}
                sx={{
                  position: 'absolute',
                  right: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'white',
                  boxShadow: theme.shadows[4],
                  zIndex: 2,
                  display: { xs: 'none', md: 'flex' },
                  '&:hover': { bgcolor: 'grey.100' }
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>

            {/* View All Link */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/products');
                }}
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Xem tất cả &gt;
              </Link>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Best-selling Products Section */}
      <Box sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
              <Paper
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 4,
                  bgcolor: '#D32F2F',
                  color: 'white'
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Sản phẩm bán chạy
                </Typography>
              </Paper>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/products');
                }}
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Xem tất cả &gt;
              </Link>
            </Box>

            {/* Best Seller Products Carousel */}
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={() => scrollBestSeller('left')}
                sx={{
                  position: 'absolute',
                  left: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'white',
                  boxShadow: theme.shadows[4],
                  zIndex: 2,
                  display: { xs: 'none', md: 'flex' },
                  '&:hover': { bgcolor: 'grey.100' }
                }}
              >
                <ChevronLeftIcon />
              </IconButton>

              <Box
                ref={bestSellerScrollRef}
                sx={{
                  display: 'flex',
                  gap: 2,
                  overflowX: 'auto',
                  pb: 2,
                  scrollBehavior: 'smooth',
                  '&::-webkit-scrollbar': { height: 8 },
                  '&::-webkit-scrollbar-thumb': {
                    bgcolor: 'grey.400',
                    borderRadius: 4
                  }
                }}
              >
                {bestSellingProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    style={{ minWidth: 280 }}
                  >
                    <Card
                      onClick={() => navigate(`/product/${product.id}`)}
                      sx={{
                        height: '100%',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        bgcolor: 'white',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.shadows[8]
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          image={product.image}
                          alt={product.name}
                          sx={{ height: 200, objectFit: 'cover' }}
                        />
                        {product.discount && (
                          <Chip
                            label={`-${product.discount}%`}
                            sx={{
                              position: 'absolute',
                              top: 8,
                              left: 8,
                              bgcolor: '#D32F2F',
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: '0.875rem',
                              height: 28
                            }}
                          />
                        )}
                      </Box>
                      <CardContent sx={{ p: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            mb: 1.5,
                            height: 50,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: 1.4
                          }}
                        >
                          {product.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Rating value={product.rating} precision={0.1} readOnly size="small" />
                          <Typography variant="caption" color="text.secondary">
                            ({product.reviews} đánh giá)
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 'bold',
                            color: theme.palette.primary.main,
                            mb: 0.5,
                            fontSize: '1.1rem'
                          }}
                        >
                          {product.price}₫ / {product.unit}
                        </Typography>
                        {product.originalPrice && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              textDecoration: 'line-through',
                              mb: 1
                            }}
                          >
                            {product.originalPrice}₫
                          </Typography>
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1.5, display: 'block' }}>
                          {product.packaging}
                        </Typography>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': { bgcolor: theme.palette.primary.dark }
                          }}
                        >
                          Chọn mua
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>

              <IconButton
                onClick={() => scrollBestSeller('right')}
                sx={{
                  position: 'absolute',
                  right: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'white',
                  boxShadow: theme.shadows[4],
                  zIndex: 2,
                  display: { xs: 'none', md: 'flex' },
                  '&:hover': { bgcolor: 'grey.100' }
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Trust / Info Section */}
      <Box sx={{ py: 6, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8]
                    }
                  }}
                >
                  <VerifiedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Đổi trả trong 30 ngày
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chính sách đổi trả linh hoạt và minh bạch
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8]
                    }
                  }}
                >
                  <SupportAgentIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Tư vấn cùng dược sĩ chuyên môn
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Đội ngũ dược sĩ giàu kinh nghiệm hỗ trợ 24/7
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8]
                    }
                  }}
                >
                  <LocalShippingIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Giao hàng nhanh chóng
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Giao hàng toàn quốc trong 24-48 giờ
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8]
                    }
                  }}
                >
                  <VerifiedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Sản phẩm chính hãng
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    100% sản phẩm có giấy phép và nguồn gốc rõ ràng
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
