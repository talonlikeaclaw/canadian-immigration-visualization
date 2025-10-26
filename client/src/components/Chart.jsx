import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function Chart({city}){
  const [countries, setCountries] = useState([]);
  const [counts, setCounts] = useState([]);

  useEffect(()=>{
    fetch(`/api/immigration/${city}`).
      then(reponse =>{
        if (reponse.ok) {
          return reponse.json();
        }
        console.error('Network response was not ok.');
      }).
      then(data =>{
        const info = data.countries;
        setCountries(Object.keys(info));
        setCounts(Object.values(info));
      }).
      catch();
  }, [city]);

  // Only have 10 countries
  countries.length = 10;
  counts.length = 10;

  const data = [
    {
      y: countries,
      x: counts,
      type: 'bar',
      orientation: 'h',
      marker: {
        color: 'rgba(55,128,191,0.6)',
        line: {
          color: 'rgba(55,128,191,1.0)',
          width: 1,
        },
      },
    },
  ];

  const layout = {
    title: `Immigration patterns to ${city}`,
    xaxis: {
      title: 'Count',
    },
    yaxis: {
      title: 'County',
    },
  };

  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: '100%'}}
    />
  );
}

export default Chart;