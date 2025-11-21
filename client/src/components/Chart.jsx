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

/**
 * Generic bar chart wrapper around chart.js with defensive empty state handling.
 * @param {{label: string, value: number}[]} data - Chart data entries.
 * @param {string} title - Heading displayed above the chart.
 * @param {string} [xLabel] - Optional label for the x-axis.
 * @param {string} [yLabel] - Optional label for the y-axis.
 * @param {string} [classes] - Extra CSS classes for the wrapper element.
 * @returns {JSX.Element} Configured bar chart or an error message when data is missing.
 */
function Chart({ data, title, xLabel, yLabel, classes, footerContent}) {
  if (!data || data.length === 0) {
    return <span className="chart-error">
      There was an error fetching the data. <br/> No data available to display.
    </span>;
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
      <section className="chart-header">
        <h2 style={{ textAlign: 'center' }}>{title}</h2>
      </section>
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
      <footer>{footerContent}</footer>
    </div>
  );
};

export default Chart;
