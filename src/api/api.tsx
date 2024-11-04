import axios from "axios";

const API_BASE_URL = "http://localhost:8083";

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
        const response = await axios.post("http://localhost:8083/users/login", {
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
        await axios.post('http://localhost:8083/users/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        localStorage.removeItem("token"); 
        localStorage.removeItem("expires_at");
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
    }
};

export const fetchInformationsData = async (numeroVaga: number) => {
    try {
        const response = await axios.get(`http://localhost:8083/vagas/${numeroVaga}/veiculo-atual`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch(error){
        console.log(`Erro ao buscar informações da vaga ${numeroVaga}:`, error);
    }
};