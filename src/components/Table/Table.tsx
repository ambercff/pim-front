import 'handsontable/dist/handsontable.full.min.css';
import { useEffect, useState } from 'react';
import { fetchEntradasSaidas } from '../../api/api';
import styles from './Table.module.css'

interface Veiculo {
  placa: string;
  modelo: string;
  cor: string;
}

interface Vaga {
  numeroVaga: number;
  statusVaga: string;
}

interface EntradaSaida {
  veiculoDTO: Veiculo;
  vagaDTO: Vaga;
  horaEntrada: string;
  horaSaida: string | null;
  nomeMotorista: string;
}

function Table() {
  const [data, setData] = useState<string[][]>([]);

  const headers = [
    'Motorista',
    'Número Vaga',
    'Placa',
    'Modelo',
    'Cor',
    'Hora Entrada',
    'Hora Saída',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEntradasSaidas();
        if (response) {
          const formattedData = response.data.map((entradaSaida: EntradaSaida) => [
            entradaSaida.nomeMotorista,
            entradaSaida.vagaDTO.numeroVaga.toString(),
            entradaSaida.veiculoDTO.placa,
            entradaSaida.veiculoDTO.modelo,
            entradaSaida.veiculoDTO.cor,
            new Date(entradaSaida.horaEntrada).toLocaleString(),
            entradaSaida.horaSaida
              ? new Date(entradaSaida.horaSaida).toLocaleString()
              : 'Ainda no local',
          ]);
          setData(formattedData);
        }
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };
    fetchData();
  }, []);

  return (
        <div className={styles.general_container}>
            <h1> Registros de Entradas e Saídas </h1>
            <table>
                <thead>
                    <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
}

export default Table;
