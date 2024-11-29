import styles from './Monitoramento.module.css';
import { Modal } from '../modal/Modal';
import { useEffect, useState } from 'react';
import { fetchInformationsData, fetchVagas } from '../../api/api';
import Swal from 'sweetalert2';

export interface Vaga {
    numeroVaga: number; // Alterado para 'number'
    statusVaga: string;
}

interface Motorista {
    nome: string;
    email: string;
    telefone: string;
}

export interface InformationsData {
    motorista: Motorista;
    placa: string;
    modelo: string;
    cor: string;
}

export function Monitoramento() {
    const [vagas, setVagas] = useState<Vaga[]>([]);
    const [informationsData, setInformationsData] = useState<InformationsData | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const fetchData = async () => {
        const response = await fetchVagas();
        if (response) {
            setVagas(response.data);
        }
    };

    useEffect(() => {
        
        fetchData();

        
        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);

    }, []);


    const handleInformationsData = async (numeroVaga: number, statusVaga: string) => {
        if (statusVaga !== 'STATUS_OCUPADO') {
            Swal.fire({
                title: 'Nenhum carro na vaga!',
                text: "A vaga precisa estar ocupada para que tenha informações disponíveis",
                icon: "error"
              });
        }
    
        const response = await fetchInformationsData(numeroVaga);
        if (response) {
            setInformationsData(response.data);
            setOpenModal(true);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <p><b>Selecione</b> a vaga que deseja</p>
                        <p><b>visualizar</b></p>
                    </div>
                    <div className={styles.vagas_container}>
                        <hr />
                    </div>
                        <div className={styles.grid_linhas}>
                            {vagas.map((vaga, index) => (
                                <div
                                    className={index === 0 ? styles.linha_vertical_transparente : styles.linha_vertical}
                                    key={vaga.numeroVaga}
                                >
                                    <div className={styles.vaga_container}>
                                        <button
                                            onClick={() => handleInformationsData(vaga.numeroVaga, vaga.statusVaga)}
                                            className={`${vaga.statusVaga === 'STATUS_OCUPADO' ? styles.occupied : ''} ${styles.vaga}`}
                                        ></button>
                                        <p className={styles.vaga_marcacao}>{`Vaga ${vaga.numeroVaga}`}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    <Modal
                        isOpen={openModal}
                        onClose={() => setOpenModal(false)}
                        data={informationsData}
                    />
                </div>
            </div>
        </>
    );
}
