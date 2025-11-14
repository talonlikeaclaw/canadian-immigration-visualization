import { useMemo, useState } from 'react';
import Chart from './Chart';
import '../assets/styles/DataExplorer.css';

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

  const [selectedCity, setSelectedCity] = useState('Montréal');
  const [activeCity, setActiveCity] = useState('');
  const [comparisonCity, setComparisonCity] = useState('');
  const [activeComparisonCity, setActiveComparisonCity] = useState('');

  const [cityInfo, setCityInfo] = useState(null);
  const [comparisonCityInfo, setComparisonCityInfo] = useState(null);

  const [period, setPeriod] = useState('All time');
  const [activePeriod, setActivePeriod] = useState('All time');
  const [langToggle, setLangToggle] = useState('Include');
  const [resultLimit, setResultLimit] = useState(10);

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const primaryData = useMemo(
    () =>
      data && activeCity ? data.filter(d => d.city === activeCity) : [],
    [data, activeCity]
  );

  const comparisonData = useMemo(
    () =>
      data && activeComparisonCity
        ? data.filter(d => d.city === activeComparisonCity)
        : [],
    [data, activeComparisonCity]
  );

  /**
   * Fetches and normalizes dataset information for a given city.
   * @param {string} city - The name of the city to fetch data for.
   * @param {string} type - The dataset category to retrieve.
   * @param {string} period - The selected time period.
   * @returns {Promise<Array<{ label: string, value: number }>>}
   */
  async function fetchDataset(city, type, period, lang) {
    try {
      // Build dataset URL based on type and period
      let datasetUrl;
      if (type === 'immigration') {
        if (period === 'All time') {
          datasetUrl = `/api/immigration/${encodeURIComponent(city)}`;
        } else if (period === 'Before 1980') {
          datasetUrl = `/api/immigration/${encodeURIComponent(
            city
          )}/period/1980`;
        } else {
          // Regex created by ChatGPT.
          const match = period.match(/(\d{4})\s*to\s*(\d{4})/);
          if (match) {
            const [, start, end] = match;
            datasetUrl = `/api/immigration/${encodeURIComponent(
              city
            )}/period/${start}/${end}`;
          } else {
            // Fallback
            datasetUrl = `/api/immigration/${encodeURIComponent(city)}`;
          }
        }
      } else {
        datasetUrl = `/api/languages/${encodeURIComponent(city)}`;
      }

      // Fetch dataset and handle normalization
      const datasetRes = await fetch(datasetUrl);
      if (!datasetRes.ok) throw new Error('Failed to fetch dataset');
      const datasetJson = await datasetRes.json();

      if (type === 'immigration') {
        // Transform object of countries into array of { label, value }
        return Object.entries(datasetJson.countries).map(
          ([label, value]) => ({ label, value })
        );
      } else {
        const filteredLanguages =
          lang === 'Exclude'
            ? datasetJson.filter(
              ({ Language }) =>
                Language !== 'French' && Language !== 'English'
            )
            : datasetJson;

        // Transform array of language objects into { label, value }
        return filteredLanguages.map(({ Language, Count }) => ({
          label: Language,
          value: Count
        }));
      }
    } catch (err) {
      console.error(`[Fetch Error] ${city}:`, err);
      return [];
    }
  }

  /**
   * Handles form submission: fetches city info and dataset
   * based on current selections (city, dataset type, and period).
   */
  async function handleSubmit(e) {
    e.preventDefault();

    // Ensure city is selected
    if (!selectedCity) {
      setError('Please select at least one city.');
      return;
    }

    // Reset UI
    setError('');
    setLoading(true);
    setCityInfo(null);
    setComparisonCityInfo(null);
    setData(null);

    // Commit form selections
    setActiveCity(selectedCity);
    setActiveComparisonCity(comparisonCity || '');
    setActiveDataType(dataType);
    setActivePeriod(period);

    try {
      // Fetch city info for primary city
      const cityRes = await fetch(
        `/api/city/${encodeURIComponent(selectedCity)}`
      );
      if (!cityRes.ok) throw new Error('Failed to fetch city info');
      const cityJson = await cityRes.json();
      setCityInfo(cityJson);

      // Optionally fetch comparison city info
      let comparisonJson = null;
      if (comparisonCity) {
        const comparisonRes = await fetch(
          `/api/city/${encodeURIComponent(comparisonCity)}`
        );
        if (comparisonRes.ok) comparisonJson = await comparisonRes.json();
        setComparisonCityInfo(comparisonJson);
      } else {
        setComparisonCityInfo(null);
      }

      const primaryData = await fetchDataset(
        selectedCity,
        dataType,
        period,
        langToggle
      );
      let comparisonData = [];

      if (comparisonCity) {
        comparisonData = await fetchDataset(
          comparisonCity,
          dataType,
          period,
          langToggle
        );
      }

      const normalizedPrimary = primaryData.
        slice(0, resultLimit).
        map(d => ({
          ...d,
          city: selectedCity
        }));

      const normalizedComparison = comparisonData.
        slice(0, resultLimit).
        map(d => ({
          ...d,
          city: comparisonCity
        }));

      const combined = [...normalizedPrimary, ...normalizedComparison];

      setData(combined);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* === Selection Form === */}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <header>
            <h2>City Data Explorer</h2>
            <p>
              Pick one or two cities and dataset to visualize/compare
              immigration or language statistics.
            </p>
          </header>
          <section className="input-row">
            {/* City selection */}
            {/* === City 1 === */}
            <label htmlFor="city-select">Primary City:</label>
            <select
              id="city-select"
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
            >
              <option value="">Select a city</option>
              {cities.map(c => 
                <option key={c} value={c}>
                  {c}
                </option>
              )}
            </select>

            {/* === Optional comparison city === */}
            <label htmlFor="comparison-select">Comparison City:</label>
            <select
              id="comparison-select"
              value={comparisonCity}
              onChange={e => setComparisonCity(e.target.value)}
            >
              <option value="">None</option>
              {cities.
                filter(c => c !== selectedCity).
                map(c => 
                  <option key={c} value={c}>
                    {c}
                  </option>
                )}
            </select>
          </section>

          <section className="input-row">
            {/* Dataset type (Immigration / Language) */}
            <label htmlFor="dataset-select">Dataset:</label>
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
            {dataType === 'immigration' ? 
              <>
                <label htmlFor="period-select">Period:</label>
                <select
                  id="period-select"
                  value={period}
                  onChange={e => setPeriod(e.target.value)}
                >
                  {periods.map(p => 
                    <option key={p} value={p}>
                      {p}
                    </option>
                  )}
                </select>
              </>
              : 
              <>
                <label htmlFor="lang-select">Official Languages:</label>
                <select
                  id="lang-select"
                  value={langToggle}
                  onChange={e => setLangToggle(e.target.value)}
                >
                  <option value="Include">Include</option>
                  <option value="Exclude">Exclude</option>
                </select>
              </>
            }
          </section>

          {/* Number of entries to display */}
          <label htmlFor="limit-select">Result Limit:</label>
          <select
            id="limit-select"
            value={resultLimit}
            onChange={e => setResultLimit(parseInt(e.target.value))}
          >
            <option value={5}>Top 5</option>
            <option value={10}>Top 10</option>
            <option value={15}>Top 15</option>
            <option value={20}>Top 20</option>
          </select>

          <button type="submit" disabled={!selectedCity || loading}>
            {loading ? 'Loading...' : 'Show Data'}
          </button>
        </fieldset>
      </form>

      {/* Display any error messages */}
      <section>{error && <p className="error">{error}</p>}</section>

      {/* Chart visualization */}
      {data && data.length > 0 ? 
        <section className="chart-section">
          <h3>
            {activeCity}
            {activeComparisonCity
              ? ` vs ${activeComparisonCity}`
              : ''} –{' '}
            {activeDataType[0].toUpperCase() + activeDataType.slice(1)}{' '}
            Data{' '}
            {activeDataType === 'immigration' &&
            activePeriod !== 'All time'
              ? `(${activePeriod})`
              : ''}
          </h3>

          <div className="chart-grid">
            {/* Primary City */}
            <article className="chart-container">
              {cityInfo && 
                <div className="city-info">
                  <h4>About {activeCity}</h4>
                  <p>
                    {activeCity} in the province of{' '}
                    <strong>{cityInfo.Province}</strong> has a population
                    of <strong>{cityInfo.Population}</strong> people over{' '}
                    <strong>{cityInfo.AreaKm2}</strong> km².
                  </p>
                </div>
              }
              <Chart
                data={primaryData}
                title={`${activeCity} – ${activeDataType}`}
                xLabel="Count"
                yLabel={
                  activeDataType === 'immigration' ? 'Country' : 'Language'
                }
              />
            </article>

            {/* Comparison City */}
            {activeComparisonCity && 
              <article className="chart-container">
                {comparisonCityInfo && 
                  <div className="city-info">
                    <h4>About {activeComparisonCity}</h4>
                    <p>
                      {activeComparisonCity} in the province of{' '}
                      <strong>{comparisonCityInfo.Province}</strong> has a
                      population of{' '}
                      <strong>{comparisonCityInfo.Population}</strong>{' '}
                      people over{' '}
                      <strong>{comparisonCityInfo.AreaKm2}</strong> km².
                    </p>
                  </div>
                }
                <Chart
                  data={comparisonData}
                  title={`${activeComparisonCity} – ${activeDataType}`}
                  xLabel="Count"
                  yLabel={
                    activeDataType === 'immigration'
                      ? 'Country'
                      : 'Language'
                  }
                />
              </article>
            }
          </div>
        </section>
        : 
        <section className="chart-section">
          <h3>Example Data Preview</h3>
          <div className="chart-grid">
            <article className="chart-container">
              <Chart
                data={[
                  { label: 'India', value: 4200 },
                  { label: 'China', value: 3800 },
                  { label: 'Philippines', value: 2500 },
                  { label: 'United Kingdom', value: 1900 },
                  { label: 'France', value: 1600 }
                ]}
                title="Sample Immigration Data"
                xLabel="Number of Immigrants"
                yLabel="Country of Origin"
              />
            </article>
            <article className="chart-container">
              <Chart
                data={[
                  { label: 'English', value: 850000 },
                  { label: 'French', value: 600000 },
                  { label: 'Mandarin', value: 95000 },
                  { label: 'Arabic', value: 72000 },
                  { label: 'Spanish', value: 65000 }
                ]}
                title="Sample Language Data"
                xLabel="Number of Speakers"
                yLabel="Language"
              />
            </article>
          </div>
        </section>
      }
    </>
  );
}
