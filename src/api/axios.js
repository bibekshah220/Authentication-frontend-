import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    withCredentials: true, // Needed for cookies
});

// Response interceptor for handling token expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Backend throws 403 if no token, 500 with 'jwt expired' if expired
        const isAuthError = 
            error.response?.status === 403 || 
            (error.response?.status === 500 && error.response?.data?.message === 'jwt expired');

        if (isAuthError && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh token
                await axios.post('http://localhost:8000/api/v1/refresh-token', {}, { withCredentials: true });
                
                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed (e.g. refresh token expired too)
                // We shouldn't dispatch to window from here cleanly, but we can return the error
                // The Context will catch it and set user to null.
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;
