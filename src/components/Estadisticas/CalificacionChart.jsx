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

const CalificacionChart = ({ games }) => {
  // Ordenamos juegos de mayor a menor calificación
  const sorted = [...games].sort((a, b) => b.calificacion - a.calificacion);

  const data = {
    labels: sorted.map((g) => g.titulo),
    datasets: [
      {
        label: "Calificación",
        data: sorted.map((g) => g.calificacion),
        backgroundColor: "rgba(0, 255, 136, 0.3)",
        borderColor: "#00ff88",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Calificación por Juego",
        color: "#fff",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: { color: "#e0e0e0" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      x: {
        ticks: { color: "#e0e0e0" },
        grid: { display: false },
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default CalificacionChart;
