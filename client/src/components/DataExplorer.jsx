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
  const [cityInfo, setCityInfo] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedCity) {
      setError('Please select a city first.');
      return;
    }

    setError('');
    setLoading(true);
    setCityInfo(null);
    setData(null);

    try {
      const cityRes = await fetch(
        `/api/city/${encodeURIComponent(selectedCity)}`
      );
      if (!cityRes.ok) throw new Error('Failed to fetch city info');
      const cityJson = await cityRes.json();
      setCityInfo(cityJson);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
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

          <label htmlFor="dataset-select">Dataset</label>
          <select
            name="dataset"
            id="dataset-select"
            value={datasetType}
            onChange={e => setDatasetType(e.target.value)}
          >
            <option value="immigration">Immigration</option>
            <option value="language">Language</option>
          </select>

          <button type="submit" disabled={!selectedCity || loading}>
            {loading ? 'Loading...' : 'Show Data'}
          </button>
        </fieldset>
      </form>

      <section>{error && <p className="error">{error}</p>}</section>

      {cityInfo && (
        <section>
          <article>
            <h3>About {selectedCity}</h3>
            <p>
              {selectedCity} in the province of{' '}
              <strong>{cityInfo.Province}</strong> has a population of{' '}
              <strong>{cityInfo.Population}</strong> people over{' '}
              <strong>{cityInfo.AreaKm2}</strong> km², giving it a population density
              of{' '}
              <strong>
                {cityInfo.AreaKm2 && cityInfo.Population
                  ? (cityInfo.Population / cityInfo.AreaKm2).toFixed(1)
                  : 'N/A'}
              </strong>{' '}
              people per km².
            </p>
          </article>
        </section>
      )}
    </>
  );
}
