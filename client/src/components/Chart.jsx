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

function Chart({ data, title, xLabel, yLabel, classes}) {
  if (!data || data.length === 0) {
    return <span>There was an error fetching the data. <br/> No data available to display.</span>;
  }

  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);

  const userData = {
    labels: labels,
    datasets: [{
      data: values,
      backgroundColor: '#781E0E',
      hoverBackgroundColor: '#99331F',
      borderColor: '#99331F',
      borderWidth: 1,
    }]
  };

  return (
    <div className={`chart-wrapper ${classes}`}>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <Bar
        data={userData}
        options={{
          indexAxis: 'x',
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
          },
          responsive: true,
          maintainAspectRatio: false,
          resizeDelay: 0,
        }}
      />
    </div>
  );
};

export default memo(Chart);
