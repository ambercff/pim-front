//import React from 'react';
import styles from './Modal.module.css';
import {InformationsData } from '../monitoramento/Monitoramento';



interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InformationsData | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.background} onClick={onClose}>
        <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modal_content}>
            <div className={styles.info_occupant}>
              <div className={styles.title}>
                <p>Veículo na Vaga</p>
              </div>
              <div className={styles.vehicle_content}>
                <p>Placa: <span className={styles.vehicle_info}>{data?.placa ?? 'Carregando...'}</span></p>
                <p>Modelo: <span className={styles.vehicle_info}>{data?.modelo ?? 'Carregando...'}</span></p>
                <p>Cor: <span className={styles.vehicle_info}>{data?.cor ?? 'Carregando...'}</span></p>
              </div>
              <div className={styles.owner_content}>
                <p>Motorista: <span className={styles.owner_info}>{data?.motorista.nome ?? 'Carregando...'}</span></p>
                <p>Email: <span className={styles.owner_info}>{data?.motorista.email ?? 'Carregando...'}</span></p>
                <p>Telefone: <span className={styles.owner_info}>{data?.motorista.telefone ?? 'Carregando...'}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
