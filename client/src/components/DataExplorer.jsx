import { useState } from 'react';

const cities = [
  'Halifax',
  'Montréal',
  'Toronto',
  'Calgary',
  'Edmonton',
  'Vancouver'
];

export default function DataExplorer() {
  const [datasetType, setDatasetType] = useState('immigration');
  const [selectedCity, setSelectedCity] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    // TODO: implement fetching
  }

  return (
    <>
      <header>
        <h2>City Data Explorer</h2>
        <p>
          Pick a city and dataset to visualize immigration or language
          statistics.
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Options</legend>

          <label htmlFor="city-select">City</label>
          <select
            name="city"
            id="city-select"
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
          >
            <option value="">Select a city</option>
            {cities.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </fieldset>
      </form>
    </>
  );
}
