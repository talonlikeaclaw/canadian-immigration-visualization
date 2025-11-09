import { memo } from 'react';
import Plot from 'react-plotly.js';

function Chart({ data, title, xLabel, yLabel }) {
  if (!data || data.length === 0) {
    return <p>No data available to display.</p>;
  }

  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);

  const plotData = [
    {
      y: labels,
      x: values,
      type: 'bar',
      orientation: 'h',
      marker: {
        color: 'rgba(55,128,191,0.6)',
        line: {
          color: 'rgba(55,128,191,1.0)',
          width: 1
        }
      }
    }
  ];

  const layout = {
    title,
    xaxis: {
      title: { title: xLabel }
    },
    yaxis: {
      title: { title: yLabel, automargin: true }
    },
    margin: { l: 110, r: 20, t: 20, b: 20 },
    autosize: true
  };

  return (
    <Plot
      data={plotData}
      layout={layout}
      config={{
        responsive: true,
        displaylogo: false,
        modeBarButtonsToRemove: [
          'zoomIn2d',
          'zoomOut2d',
          'autoScale2d',
          'select2d',
          'lasso2d',
          'toggleSpikelines',
          'hoverClosestCartesian',
          'hoverCompareCartesian',
          'pan2d'
        ]
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default memo(Chart);
