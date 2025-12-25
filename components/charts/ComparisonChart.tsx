'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ComparisonChartProps {
  stocks: Array<{
    symbol: string;
    data: any[];
    color: string;
  }>;
  title?: string;
  height?: number;
}

export default function ComparisonChart({ stocks, title = "Stock Comparison", height = 400 }: ComparisonChartProps) {
  if (!stocks || stocks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
        <p className="text-gray-400">No comparison data available</p>
      </div>
    );
  }

  const normalizedStocks = stocks.map(stock => {
    if (!stock.data || stock.data.length === 0) return { ...stock, normalizedData: [] };

    const firstPrice = stock.data[0]?.close || 1;
    const normalizedData = stock.data.map(item => ({
      ...item,
      normalizedPrice: ((item.close - firstPrice) / firstPrice) * 100
    }));

    return { ...stock, normalizedData };
  });

  const allDates = new Set();
  normalizedStocks.forEach(stock => {
    stock.normalizedData.forEach(item => allDates.add(item.date));
  });

  const sortedDates = Array.from(allDates).sort();
  const labels = sortedDates.map(date => new Date(date as string).toLocaleDateString());

  const datasets = normalizedStocks.map((stock, index) => {
    const dataMap = new Map(stock.normalizedData.map(item => [item.date, item.normalizedPrice]));

    return {
      label: stock.symbol,
      data: sortedDates.map(date => dataMap.get(date) || null),
      borderColor: stock.color,
      backgroundColor: stock.color + '20',
      borderWidth: 2,
      fill: false,
      tension: 0.1,
      spanGaps: true,
    };
  });

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#E5E7EB',
          usePointStyle: true,
        },
      },
      title: {
        display: true,
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
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y?.toFixed(2)}%`;
          },
        },
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
            return value.toFixed(1) + '%';
          },
        },
        grid: {
          color: '#374151',
        },
      },
    },
    elements: {
      point: {
        radius: 1,
        hoverRadius: 4,
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div style={{ height: `${height}px` }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
