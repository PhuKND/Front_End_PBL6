import api from './api';

export async function login(payload) {
  // Expecting { email, password }
  const res = await api.post('/auth/login', payload);
  return res.data;
}

export async function register(payload) {
  // Expecting { name, email, password, phone }
  const res = await api.post('/auth/register', payload);
  return res.data;
}


