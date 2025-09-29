import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  TextField,
  IconButton,
  Button,
  Chip,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Send as SendIcon,
  LocalHospital as LocalHospitalIcon,
  Videocam as VideocamIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

export default function ConsultPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [messages, setMessages] = useState(() => [
    { id: 1, sender: 'doctor', text: 'Xin chào! Tôi là bác sĩ của MedStore. Bạn cần tư vấn về vấn đề gì?', time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newMsg = { id: Date.now(), sender: 'me', text: trimmed, time: new Date() };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, sender: 'doctor', text: 'Cảm ơn bạn. Tôi đã ghi nhận. Vui lòng cung cấp thêm triệu chứng hoặc thuốc đang dùng để tư vấn chính xác hơn.', time: new Date() }
    ]);
    setTyping(false);
  };

  const header = useMemo(() => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar sx={{ bgcolor: 'primary.main' }}>
        <LocalHospitalIcon />
      </Avatar>
      <Box>
        <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 'bold' }}>Tư vấn với Bác sĩ</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip label="Trực tuyến" color="success" size="small" />
          <Typography variant="body2" color="text.secondary">Phản hồi trong ~1 phút</Typography>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
        <Button variant="outlined" startIcon={<PhoneIcon />}>Gọi</Button>
        <Button variant="contained" startIcon={<VideocamIcon />}>Video</Button>
      </Box>
    </Box>
  ), [isMobile]);

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Box sx={{ p: 2.5, bgcolor: 'white', borderBottom: '1px solid', borderColor: 'grey.200' }}>
              {header}
            </Box>

            <Box sx={{ p: { xs: 2, md: 3 }, height: isMobile ? '60vh' : '70vh', overflowY: 'auto', bgcolor: 'grey.50' }}>
              {messages.map((m) => (
                <Box key={m.id} sx={{ display: 'flex', mb: 2, justifyContent: m.sender === 'me' ? 'flex-end' : 'flex-start' }}>
                  {m.sender !== 'me' && (
                    <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
                      <LocalHospitalIcon fontSize="small" />
                    </Avatar>
                  )}
                  <Box sx={{ maxWidth: '75%' }}>
                    <Paper sx={{ p: 1.25, px: 1.75, bgcolor: m.sender === 'me' ? 'primary.main' : 'white', color: m.sender === 'me' ? 'white' : 'text.primary', borderRadius: 3, borderTopLeftRadius: m.sender === 'me' ? 12 : 4, borderTopRightRadius: m.sender === 'me' ? 4 : 12 }}>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{m.text}</Typography>
                    </Paper>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: .5, display: 'block', textAlign: m.sender === 'me' ? 'right' : 'left' }}>
                      {new Date(m.time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Box>
                </Box>
              ))}
              {typing && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main' }}>
                    <LocalHospitalIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="body2">Bác sĩ đang trả lời...</Typography>
                </Box>
              )}
              <div ref={bottomRef} />
            </Box>

            <Divider />
            <Box sx={{ p: 2, bgcolor: 'white', display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <TextField
                fullWidth
                size="medium"
                placeholder="Nhập nội dung cần tư vấn (triệu chứng, thuốc đang dùng,...)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <IconButton color="primary" onClick={handleSend} sx={{ bgcolor: 'primary.light', color: 'white', '&:hover': { bgcolor: 'primary.main' } }}>
                <SendIcon />
              </IconButton>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}


