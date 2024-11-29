import axios from "axios";
import Swal from 'sweetalert2'
import { API_BASE_URL } from "./config";


export const fetchVagas = async () => {
    const token = localStorage.getItem("token")
    try {
        const response = await axios.get(`${API_BASE_URL}/vagas`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
        return response;

    } catch (error) {
        console.log(`Erro: ${error}`);
    }
};

export const login = async (login: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, {
            login: login,
            senha: password
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expires_at", response.data.expiresAt);
    } catch (error) {
        console.error("Erro ao fazer login!", error);
        throw error;
    }
};

export const logout = async () => {
    const token = localStorage.getItem("token")
    try {
        await axios.post(`${API_BASE_URL}/users/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        localStorage.clear();
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
    }
};

export const fetchInformationsData = async (numeroVaga: number) => {
    const token = localStorage.getItem("token")
    try {
        const response = await axios.get(`${API_BASE_URL}/vagas/${numeroVaga}/veiculo-atual`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Erro ao buscar informações da vaga:", error.response?.data);
            Swal.fire({
                title: 'Acesso negado!',
                text: "Você não tem permissão para acessar este recurso.",
                icon: "error"
              });
        }
    }
};

export const fetchEntradasSaidas = async () => {
    const token = localStorage.getItem("token")
    try {
        const response = await axios.get(`${API_BASE_URL}/entradaSaida`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
        return response;

    } catch (error) {
        console.log(`Erro: ${error}`);
    }
};

export const isTokenExpired = () => {
    const token = localStorage.getItem("token")
    if(!token){
        return true;
    }

    const currentTime = Date.now();
    const expiresAtString = localStorage.getItem("expires_at");

    if (expiresAtString !== null){
        const expiresAt = new Date(expiresAtString).getTime();
        const isExpired = currentTime > expiresAt;

        if (isExpired) {
            localStorage.clear();
            document.cookie = "SESSION" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Tirar o cookie da sessão
        }
        return isExpired;
    }
    return true;
}