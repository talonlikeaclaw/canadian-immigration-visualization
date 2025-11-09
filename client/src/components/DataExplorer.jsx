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

const periods = [
  'All time',
  'Before 1980',
  '1980 to 1990',
  '1991 to 2000',
  '2001 to 2005',
  '2006 to 2010',
  '2011 to 2015',
  '2016 to 2021'
];

export default function DataExplorer() {
  const [dataType, setDataType] = useState('immigration');
  const [activeDataType, setActiveDataType] = useState('immigration');
  const [selectedCity, setSelectedCity] = useState('');
  const [activeCity, setActiveCity] = useState('');
  const [cityInfo, setCityInfo] = useState(null);
  const [data, setData] = useState(null);
  const [period, setPeriod] = useState('All time');
  const [activePeriod, setActivePeriod] = useState('All time');
  const [resultLimit, setResultLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handles form submission: fetches city info and dataset
   * based on current selections (city, dataset type, and period).
   */
  async function handleSubmit(e) {
    e.preventDefault();

    // Ensure city is selected
    if (!selectedCity) {
      setError('Please select a city first.');
      return;
    }

    // Reset UI
    setError('');
    setLoading(true);
    setCityInfo(null);
    setData(null);

    // Commit form selections
    setActiveCity(selectedCity);
    setActiveDataType(dataType);
    setActivePeriod(period);

    try {
      // Fetch city information
      const cityRes = await fetch(
        `/api/city/${encodeURIComponent(selectedCity)}`
      );
      if (!cityRes.ok) throw new Error('Failed to fetch city info');
      const cityJson = await cityRes.json();
      setCityInfo(cityJson);

      // Build dataset URL based on type and period
      let datasetUrl;
      if (dataType === 'immigration') {
        if (period === 'All time') {
          datasetUrl = `/api/immigration/${encodeURIComponent(
            selectedCity
          )}`;
        } else if (period === 'Before 1980') {
          datasetUrl = `/api/immigration/${encodeURIComponent(
            selectedCity
          )}/period/1980`;
        } else {
          // Regex created by ChatGPT.
          const match = period.match(/(\d{4})\s*to\s*(\d{4})/);
          if (match) {
            /* eslint-disable no-unused-vars*/
            const [_, start, end] = match;
            datasetUrl = `/api/immigration/${encodeURIComponent(
              selectedCity
            )}/period/${start}/${end}`;
          } else {
            // Fallback
            datasetUrl = `/api/immigration/${encodeURIComponent(
              selectedCity
            )}`;
          }
        }
      } else {
        datasetUrl = `/api/languages/${encodeURIComponent(selectedCity)}`;
      }

      // Fetch dataset and handle normalization
      const datasetRes = await fetch(datasetUrl);
      if (!datasetRes.ok) throw new Error('Failed to fetch dataset');
      const datasetJson = await datasetRes.json();

      let normalizedData = [];
      if (dataType === 'immigration') {
        // Transform object of countries into array of { label, value }
        normalizedData = Object.entries(datasetJson.countries).map(
          ([label, value]) => ({ label, value })
        );
      } else {
        // Transform array of language objects into { label, value }
        normalizedData = datasetJson.map(({ Language, Count }) => ({
          label: Language,
          value: Count
        }));
      }

      // Trim results
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


      {/* === Selection Form === */}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Options</legend>

          {/* City selection */}
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

          {/* Dataset type (Immigration / Language) */}
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

          {/* Period only shown for immigration */}
          {dataType === 'immigration' && (
            <>
              <label htmlFor="period-select">Period</label>
              <select
                id="period-select"
                value={period}
                onChange={e => setPeriod(e.target.value)}
              >
                {periods.map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Number of entries to display */}
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

      {/* Display any error messages */}
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

      {/* Chart visualization */}
      {data && (
        <section>
          <article>
            <h3>
              {activeCity} -{' '}
              {activeDataType[0].toUpperCase() + activeDataType.slice(1)}{' '}
              Data{' '}
              {activeDataType === 'immigration' &&
              activePeriod !== 'All time'
                ? `(${activePeriod})`
                : ''}
            </h3>
            <Chart
              data={data}
              title={`${activeCity} - ${activeDataType}${
                activeDataType === 'immigration' &&
                activePeriod !== 'All time'
                  ? ` (${activePeriod})`
                  : ''
              }`}
              xLabel="Count"
              yLabel={
                activeDataType === 'immigration' ? 'Country' : 'Language'
              }
            />
          </article>
        </section>
      )}
    </>
  );
}
