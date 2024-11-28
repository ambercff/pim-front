import axios from 'axios';
import { create } from 'zustand';

interface UtilsState {
    setUpTokenExpirationInterceptor: () => void;
}

const useUtilsStore = create<UtilsState>(() => ({
    setUpTokenExpirationInterceptor: () => {
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    // Limpa o token e dados do localStorage
                    localStorage.clear();
                    document.cookie = 'SESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    window.location.href = '/'; 
                }
                return Promise.reject(error);
            }
        );
    },
        
}));

export default useUtilsStore;