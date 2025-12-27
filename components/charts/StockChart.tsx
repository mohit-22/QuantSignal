'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StockChartProps {
  data: any[];
  symbol: string;
  type?: 'line' | 'bar' | 'candlestick';
  title?: string;
  height?: number;
}

export default function StockChart({ data, symbol, type = 'line', title, height = 300 }: StockChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
        <p className="text-gray-400">No chart data available</p>
      </div>
    );
  }

  const labels = data.map(item => new Date(item.date).toLocaleDateString());
  const prices = data.map(item => item.close);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${symbol} Price`,
        data: prices,
        borderColor: type === 'line' ? '#3B82F6' : '#10B981',
        backgroundColor: type === 'bar' ? '#10B981' : 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: type === 'line',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#E5E7EB',
        },
      },
      title: {
        display: !!title,
        text: title,
        color: '#F9FAFB',
        font: {
          size: 16,
        },
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#E5E7EB',
        borderColor: '#374151',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9CA3AF',
          maxTicksLimit: 10,
        },
        grid: {
          color: '#374151',
        },
      },
      y: {
        ticks: {
          color: '#9CA3AF',
          callback: function(value: any) {
            return '$' + value.toFixed(2);
          },
        },
        grid: {
          color: '#374151',
        },
      },
    },
    elements: {
      point: {
        radius: 2,
        hoverRadius: 6,
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div style={{ height: `${height}px` }}>
        {type === 'bar' ? (
          <Bar data={chartData} options={options} />
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}
