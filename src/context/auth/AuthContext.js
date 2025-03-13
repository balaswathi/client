import { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Important for cookies
});

// Add a request interceptor to add auth token to all requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user
      };
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      try {
        console.log('Loading user with token:', localStorage.token);
        
        const res = await api.get('/api/auth/me');
        console.log('Load user response:', res.data);
        
        dispatch({
          type: 'USER_LOADED',
          payload: res.data
        });
      } catch (err) {
        console.error('Load user error:', err.response?.data || err.message);
        dispatch({ type: 'AUTH_ERROR' });
      }
    } else {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  // Register User
  const register = async (formData) => {
    try {
      console.log('Starting registration with:', formData);
      
      const res = await api.post('/api/auth/register', formData);
      console.log('Registration response:', res.data);

      localStorage.setItem('token', res.data.token);
      
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });

      loadUser();
    } catch (err) {
      console.error('Registration error full details:', err);
      console.error('Error status:', err.response?.status);
      console.error('Error data:', err.response?.data);
      
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response?.data?.error || 'Server Error'
      });
      
      throw err;
    }
  };

  // Verify Color Preference
  const verifyColor = async (formData) => {
    try {
      console.log('Verifying color with data:', formData);
      
      // Make sure all required fields are present
      if (!formData.email || !formData.colorPreference) {
        throw new Error('Missing required fields for color verification');
      }
      
      const res = await api.post('/api/auth/verify-color', formData);
      console.log('Color verification response:', res.data);
      
      return res.data;
    } catch (err) {
      console.error('Color verification error:', err.response?.data || err.message);
      throw err;
    }
  };

  // Verify Sport Preference
  const verifySport = async (formData) => {
    try {
      console.log('Verifying sport with data:', formData);
      
      // Make sure all required fields are present
      if (!formData.email || !formData.sportPreference || !formData.password) {
        throw new Error('Missing required fields for sport verification');
      }
      
      const res = await api.post('/api/auth/verify-sport', formData);
      console.log('Sport verification response:', res.data);
      
      // Log the imageId to make sure it's coming back correctly
      if (res.data && res.data.imageId) {
        console.log('Received imageId:', res.data.imageId);
      }
      
      return res.data;
    } catch (err) {
      console.error('Sport verification error:', err.response?.data || err.message);
      throw err;
    }
  };

  // Verify Graphical Password
  const verifyGraphical = async (formData) => {
    try {
      const res = await api.post('/api/auth/verify-graphical', formData);
      
      localStorage.setItem('token', res.data.token);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });

      loadUser();
      return res.data;
    } catch (err) {
      console.error('Graphical verification error:', err.response?.data || err.message);
      throw err;
    }
  };

  // Login User
  const login = async (email, password, graphicalPasswordPoints) => {
    try {
      const res = await api.post('/api/auth/login', {
        email,
        password,
        graphicalPasswordPoints
      });

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.error
      });
    }
  };

  // Logout
  const logout = async () => {
    await api.get('/api/auth/logout');
    dispatch({ type: 'LOGOUT' });
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  useEffect(() => {
    if (state.token) {
      loadUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        verifyColor,
        verifySport,
        verifyGraphical,
        login,
        logout,
        loadUser,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create the useAuth hook
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { useAuth };
export default AuthContext;