import { useState } from 'react';
import Chart from './Chart';

const cities = [
  'Halifax',
  'Montréal',
  'Toronto',
  'Calgary',
  'Edmonton',
  'Vancouver'
];

export default function DataExplorer() {
  const [dataType, setDataType] = useState('immigration');
  const [activeDataType, setActiveDataType] = useState('immigration');
  const [selectedCity, setSelectedCity] = useState('');
  const [activeCity, setActiveCity] = useState('');
  const [cityInfo, setCityInfo] = useState(null);
  const [data, setData] = useState(null);
  const [resultLimit, setResultLimit] = useState(10);
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

    setActiveCity(selectedCity);
    setActiveDataType(dataType);

    try {
      const cityRes = await fetch(
        `/api/city/${encodeURIComponent(selectedCity)}`
      );
      if (!cityRes.ok) throw new Error('Failed to fetch city info');
      const cityJson = await cityRes.json();
      setCityInfo(cityJson);

      const datasetUrl =
        dataType === 'immigration'
          ? `/api/immigration/${encodeURIComponent(selectedCity)}`
          : `/api/languages/${encodeURIComponent(selectedCity)}`;

      const datasetRes = await fetch(datasetUrl);
      if (!datasetRes.ok) throw new Error('Failed to fetch dataset');
      const datasetJson = await datasetRes.json();

      let normalizedData = [];
      if (dataType === 'immigration') {
        normalizedData = Object.entries(datasetJson.countries).map(
          ([label, value]) => ({ label, value })
        );
      } else {
        normalizedData = datasetJson.map(({ Language, Count }) => ({
          label: Language,
          value: Count
        }));
      }

      normalizedData = normalizedData.slice(0, resultLimit);

      setData(normalizedData);
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
            value={dataType}
            onChange={e => setDataType(e.target.value)}
          >
            <option value="immigration">Immigration</option>
            <option value="language">Language</option>
          </select>

          <label htmlFor="limit-select">Result Limit</label>
          <select
            id="limit-select"
            value={resultLimit}
            onChange={e => setResultLimit(parseInt(e.target.value))}
          >
            <option value={5}>Top 5</option>
            <option value={10}>Top 10</option>
            <option value={15}>Top 15</option>
            <option value={20}>Top 20</option>
            <option value={25}>Top 25</option>
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
            <h3>About {activeCity}</h3>
            <p>
              {activeCity} in the province of{' '}
              <strong>{cityInfo.Province}</strong> has a population of{' '}
              <strong>{cityInfo.Population}</strong> people over{' '}
              <strong>{cityInfo.AreaKm2}</strong> km², giving it a
              population density of{' '}
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

      {data && (
        <section>
          <article>
            <h3>
              {activeCity} -{' '}
              {activeDataType[0].toUpperCase() +
                activeDataType.slice(1)}{' '}
              Data
            </h3>
            <Chart
              data={data}
              title={`${activeCity} - ${activeDataType}`}
              xLabel="Count"
              yLabel={
                activeDataType === 'immigration'
                  ? 'Country'
                  : 'Language'
              }
            />
          </article>
        </section>
      )}
    </>
  );
}
