import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import {
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  Image as ImageIcon
} from '@mui/icons-material';

const API_BASE = 'http://127.0.0.1:5000';

const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/health`);
    const data = await response.json();
    return data.status === 'healthy' && data.model_loaded;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

const ImageUpload = ({ open, onClose, onImageProcessed }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const fileInputRef = React.useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file ảnh hợp lệ');
      return;
    }

    setSelectedFile(file);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file ảnh hợp lệ');
      return;
    }

    setSelectedFile(file);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const processImage = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const isApiHealthy = await checkApiHealth();
      if (!isApiHealthy) {
        throw new Error('API server không sẵn sàng. Vui lòng kiểm tra kết nối.');
      }

      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch(`${API_BASE}/api/classify-image`, {
        method: 'POST',
        body: formData,
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
        throw new Error('API không trả JSON hợp lệ. Vui lòng kiểm tra kết nối server.');
      }

      if (!response.ok) {
        throw new Error(data?.error || `Lỗi server: ${response.status}`);
      }

      if (!data.prediction || data.confidence === undefined) {
        throw new Error('Dữ liệu trả về không hợp lệ');
      }

      setResult(data);
      onImageProcessed && onImageProcessed(data);
    } catch (err) {
      console.error('Process image error:', err);
      setError('Lỗi khi xử lý ảnh: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    onClose && onClose();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Tải ảnh để nhận diện</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {result && !error && (
          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography variant="body1" component="div">
              <strong>Thiết bị y tế được nhận diện:</strong> {result.prediction}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Độ tin cậy: <strong>{result.confidence?.toFixed?.(1)}%</strong>
            </Typography>
          </Alert>
        )}

        <Box sx={{ textAlign: 'center' }}>
          {!preview ? (
            <Paper
              variant="outlined"
              sx={{
                p: 4,
                border: '2px dashed #ccc',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'action.hover'
                }
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={handleUploadClick}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <UploadIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
                <Typography variant="h6" color="text.secondary">
                  Kéo thả ảnh vào đây hoặc click để chọn
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hỗ trợ: JPG, PNG, GIF
                </Typography>
                <Button variant="outlined" startIcon={<ImageIcon />} onClick={handleUploadClick}>
                  Chọn ảnh
                </Button>
              </Box>
            </Paper>
          ) : (
            <Box>
              <img
                src={preview}
                alt="Selected"
                style={{
                  width: '100%',
                  maxWidth: '640px',
                  height: 'auto',
                  borderRadius: '8px',
                  border: '2px solid #e0e0e0'
                }}
              />
            </Box>
          )}
        </Box>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} color="secondary">
          Hủy
        </Button>

        {preview && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={() => {
                setSelectedFile(null);
                setPreview(null);
                setError(null);
                setResult(null);
              }}
              color="secondary"
            >
              Chọn lại
            </Button>
            <Button
              onClick={processImage}
              variant="contained"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? 'Đang xử lý...' : 'Xử lý ảnh'}
            </Button>
          </Box>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ImageUpload;
