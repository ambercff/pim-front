import axios from "axios";
import Swal from 'sweetalert2'
import { API_BASE_URL } from "./config";


const token = localStorage.getItem("token");

export const fetchVagas = async () => {
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