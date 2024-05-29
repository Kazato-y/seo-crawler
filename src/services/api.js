import axios from 'axios';

const API_URL = '/api';

export const registerUser = async (username, password, email) => {
  const response = await axios.post(`${API_URL}/register`, { username, password, email });
  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

export const addDomain = async (url) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/domains`, { url }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getDomains = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/domains`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteDomain = async (domainId) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/domains/${domainId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const crawlDomain = async (domainId, url) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/crawl`, { domainId, url }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getDomainUrls = async (domainId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/domains/${domainId}/urls`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getDomainDetails = async (domainId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/domains/${domainId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getStatusCodeUrls = async (domainId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/domains/${domainId}/urls`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getNonCanonicalUrls = async (domainId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/domains/${domainId}/urls`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getInternalLinks = async (urlId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/urls/${urlId}/internal-links`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
