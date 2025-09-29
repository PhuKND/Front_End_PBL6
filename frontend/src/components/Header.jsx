import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Box,
  Container,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  CameraAlt as CameraIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import { LocalPharmacy as LocalPharmacyIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import CameraModal from './CameraModal';
import ImageUpload from './ImageUpload';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(8)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const Header = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();

  const categories = [
    'Thực phẩm chức năng',
    'Thuốc',
    
    'Trang thiết bị y tế',
    'Thực phẩm dinh dưỡng',
    'Hỗ trợ tình dục',
    'Tiêm Vắc Xin',
    'Tư vấn với Bác Sĩ'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCameraClick = () => {
    setIsCameraOpen(true);
  };

  const handleImageUploadClick = () => {
    setIsImageUploadOpen(true);
  };

  const handleImageProcessed = (result) => {
    const prediction = result.prediction || '';
    setSearchQuery(prediction);
    setIsCameraOpen(false);
    setIsImageUploadOpen(false);
    if (onSearch) {
      onSearch(prediction);
    }
  };

  return (
    <>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 1 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">Tư vấn: 0334467772</Typography>
              </Box>
              <Typography variant="body2">Giờ làm việc: 8:00 - 22:00</Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Typography variant="body2">Hỗ trợ khách hàng</Typography>
              <Typography 
                variant="body2"
                onClick={() => navigate('/login')}
                sx={{ cursor: 'pointer', '&:hover': { color: 'warning.light' } }}
              >
                Đăng nhập
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 2 }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/')}
              style={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1.5), cursor: 'pointer' }}
            >
              <LocalPharmacyIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  MedStore
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Siêu ưu đãi, siêu trải nghiệm
                </Typography>
              </Box>
            </motion.div>

            <Box sx={{ flexGrow: 1, mx: 4, display: { xs: 'none', lg: 'block' } }}>
              <form onSubmit={handleSearch}>
                <Search sx={{ bgcolor: 'grey.100', color: 'text.primary' }}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Tìm kiếm thuốc, thực phẩm chức năng..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Box sx={{ 
                    position: 'absolute', 
                    right: 8, 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    gap: 1
                  }}>
                    <IconButton
                      onClick={handleCameraClick}
                      sx={{ 
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'primary.light' }
                      }}
                      title="Chụp ảnh"
                    >
                      <CameraIcon />
                    </IconButton>
                    <IconButton
                      onClick={handleImageUploadClick}
                      sx={{ 
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'primary.light' }
                      }}
                      title="Tải ảnh"
                    >
                      <ImageIcon />
                    </IconButton>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.dark' }
                      }}
                    >
                      Tìm kiếm
                    </Button>
                  </Box>
                </Search>
              </form>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button
                  startIcon={<PersonIcon />}
                  sx={{ 
                    display: { xs: 'none', md: 'flex' },
                    color: 'text.primary',
                    '&:hover': { color: 'primary.main' }
                  }}
                  onClick={() => navigate('/login')}
                >
                  Đăng nhập
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1 }}>
                <IconButton sx={{ color: 'text.primary', '&:hover': { color: 'primary.main' } }}>
                  <Badge badgeContent={0} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
                  Giỏ hàng
                </Typography>
              </motion.div>

              <IconButton
                onClick={toggleMenu}
                sx={{ display: { xs: 'block', lg: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>

          <Box sx={{ display: { xs: 'block', lg: 'none' }, pb: 2 }}>
            <form onSubmit={handleSearch}>
              <Search sx={{ bgcolor: 'grey.100', color: 'text.primary' }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Tìm kiếm..."
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Search>
            </form>
          </Box>
        </Container>
      </AppBar>

      <Box sx={{ bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: { xs: 'none', lg: 'flex' }, 
            gap: 4, 
            py: 1.5,
            '& > *': { cursor: 'pointer' }
          }}>
            {categories.map((category, index) => (
              <motion.div key={index} whileHover={{ y: -2 }} onClick={() => {
                if (category.toLowerCase() === 'tư vấn với bác sĩ') {
                  navigate('/consult');
                } else {
                  const slug = category.trim().replace(/\s+/g, '-');
                  navigate(`/category/${encodeURIComponent(slug)}`);
                }
              }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 500,
                    '&:hover': { color: 'warning.light' }
                  }}
                >
                  {category}
                </Typography>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={toggleMenu}
        sx={{ 
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { 
            top: 'auto',
            height: 'auto',
            maxHeight: '80vh'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={toggleMenu}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {categories.map((category, index) => (
              <ListItem key={index} button onClick={toggleMenu}>
                <ListItemText primary={category} />
              </ListItem>
            ))}
            <Divider sx={{ my: 1 }} />
            <ListItem 
              button 
              onClick={() => { 
                toggleMenu(); 
                navigate('/login'); 
              }}
            >
              <ListItemText primary="Đăng nhập" />
            </ListItem>
            <ListItem button onClick={toggleMenu}>
              <ListItemText primary="Hỗ trợ khách hàng" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <CameraModal
        open={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onImageCaptured={handleImageProcessed}
      />

      <ImageUpload
        open={isImageUploadOpen}
        onClose={() => setIsImageUploadOpen(false)}
        onImageProcessed={handleImageProcessed}
      />
    </>
  );
};

export default Header;
