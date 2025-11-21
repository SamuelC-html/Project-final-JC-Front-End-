import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorasChart = ({ games }) => {

  // Ordenamos por horas jugadas
  const sortedGames = [...games].sort((a, b) => b.horasJugadas - a.horasJugadas);

  // Datos corregidos con tus nombres reales del backend
  const chartData = {
    labels: sortedGames.map(game => game.titulo), // <-- CAMBIADO
    datasets: [
      {
        label: 'Horas Jugadas',
        data: sortedGames.map(game => game.horasJugadas), // <-- CAMBIADO
        backgroundColor: 'rgba(24, 16, 16, 0.38)',
        borderColor: 'rgba(37, 83, 31, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Horas Totales por Juego',
        color: '#FFFFFF',
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#E0E0E0' },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#E0E0E0' },
      },
    },
  };

  return <Bar options={chartOptions} data={chartData} />;
};

export default HorasChart;
