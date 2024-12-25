import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('API URL:', API_URL);

// Add a simple test function
export const testConnection = async () => {
  try {
    const response = await axios.get(`${API_URL}/test`);
    console.log('Connection test response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Connection test failed:', {
      error: error.message,
      config: error.config,
      response: error.response,
      request: error.request
    });
    throw error;
  }
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false,
  timeout: 10000,
});

// Add this to test the connection when the app starts
testConnection()
  .then(() => console.log('Backend connection successful'))
  .catch(error => console.error('Backend connection failed:', error.message));

api.interceptors.request.use(
  (config) => {
    console.log('Request Details:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
      baseURL: config.baseURL
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error Details:', {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      data: error.response?.data,
      config: error.config
    });
    return Promise.reject(error);
  }
);

export const submitFeedback = async (feedbackData) => {
  try {
    // Log the full URL being called
    console.log('Submitting to:', `${API_URL}/feedback`);
    
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  } catch (error) {
    console.error('Submission Error Details:', {
      message: error.message,
      response: error.response,
      request: error.request,
      config: error.config
    });

    if (error.response) {
      throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('Connection failed. Please check if the server is running.');
    } else {
      throw new Error('Failed to submit feedback: ' + error.message);
    }
  }
};

export const getFeedback = async ({ category, sortBy, order }) => {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (sortBy) params.append('sortBy', sortBy);
    if (order) params.append('order', order);

    const response = await api.get(`/feedback?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch feedback');
  }
};