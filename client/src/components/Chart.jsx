import { memo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ data, title, xLabel, yLabel }) {
  if (!data || data.length === 0) {
    return <span>There was an error fetching the data. <br/> No data available to display.</span>;
  }

  const labels = data.map(item => item.label).reverse();
  const values = data.map(item => item.value).reverse();

  const userData = {
    labels: labels,
    datasets: [{
      data: values,
      backgroundColor: '#F0F5F6',
      borderColor: '#2D407A',
      borderWidth: 1,
    }]
  };

  return (
    <div className="chart-wrapper">
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <Bar
        data={userData}
        options={{
          indexAxis: 'y',
          plugins: {
            title: {
              display: false
            },
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: xLabel
              },
            },
            y: {
              title: {
                display: true,
                text: yLabel,
              },
              beginAtZero: true,
            }
          }
        }}
      />
    </div>
  );
};

export default memo(Chart);
