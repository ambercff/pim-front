import { create } from 'zustand';

interface UtilsState {
    isTokenExpired: () => boolean;
}

const useUtilsStore = create<UtilsState>((set) => ({
    isTokenExpired: () => {
        const token = localStorage.getItem('token');

        if(!token){
            return true;
        }

        const currentTime = Date.now();
        const expiresAtString = localStorage.getItem('expires_at');

        if(expiresAtString !== null){
            const expiresAt = new Date(expiresAtString).getTime();
            const isExpired = currentTime > expiresAt;

            if(isExpired){
                localStorage.clear();
                document.cookie = "SESSION" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Tirar o cookie da sessão
            }
            return isExpired;
        }
        return true;
    }
}));

export default useUtilsStore;