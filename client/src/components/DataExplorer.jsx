import { useMemo, useState } from 'react';
import Chart from './Chart';
import CityInfoCard from './CityInfoCard';
import SelectField from './SelectField';
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

const cityOptions = [
  { value: '', label: 'Select a city' },
  ...cities.map(c => ({ value: c, label: c }))
];

const datasetOptions = [
  { value: 'immigration', label: 'Immigration' },
  { value: 'language', label: 'Language' }
];

const periodOptions = periods.map(p => ({ value: p, label: p }));

const langToggleOptions = [
  { value: 'Include', label: 'Include' },
  { value: 'Exclude', label: 'Exclude' }
];

const limitOptions = [
  { value: 5, label: 'Top 5' },
  { value: 10, label: 'Top 10' },
  { value: 15, label: 'Top 15' },
  { value: 20, label: 'Top 20' }
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

  const getChartTitle = () => {
    const cities = activeComparisonCity
      ? `${activeCity} vs ${activeComparisonCity}`
      : activeCity;
    const dataset =
      activeDataType.charAt(0).toUpperCase() + activeDataType.slice(1);
    const period =
      activeDataType === 'immigration' && activePeriod !== 'All time'
        ? ` (${activePeriod})`
        : '';

    return `${cities} - ${dataset} Data${period}`;
  };

  /**
   * Builds the immigration URL for fetching immigration data.
   * @param {string} city - the city to fetch data for.
   * @param {string} period - the seleced period.
   * @returns the url built depending on the parameters.
   */
  function buildImmigrationUrl(city, period) {
    const baseUrl = `/api/immigration/${encodeURIComponent(city)}`;

    if (period === 'All time') return baseUrl;
    if (period === 'Before 1980') return `${baseUrl}/period/1980`;

    const match = period.match(/(\d{4})\s*to\s*(\d{4})/);
    if (match) {
      const [, start, end] = match;
      return `${baseUrl}/period/${start}/${end}`;
    }

    return baseUrl;
  };

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
        datasetUrl = buildImmigrationUrl(city, period);
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
      const promises = [
        fetch(`/api/city/${encodeURIComponent(selectedCity)}`).then(r => r.json()),
        fetchDataset(
          selectedCity,
          dataType,
          period,
          langToggle
        )
      ];

      // Optionally fetch comparison city info
      if (comparisonCity) {
        promises.push(
          fetch(`/api/city/${encodeURIComponent(comparisonCity)}`).then(r => r.json()),
          fetchDataset(
            comparisonCity,
            dataType,
            period,
            langToggle
          )
        );
      }

      const results = await Promise.all(promises);
      const [cityJson, primaryData, comparisonJson, comparisonData = []] = results;

      setCityInfo(cityJson);
      setComparisonCityInfo(comparisonJson || null);

      const combined = [
        ...primaryData.slice(0, resultLimit).map(d => ({ ...d, city: selectedCity })),
        ...comparisonData.slice(0, resultLimit).map(d => ({ ...d, city: comparisonCity }))
      ];

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
            <SelectField
              label="Primary City:"
              id="city-select"
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              options={cityOptions}
            />
            <SelectField
              label="Secondary City (Optional):"
              id="comparison-select"
              value={comparisonCity}
              onChange={e => setComparisonCity(e.target.value)}
              options={[
                { value: '', label: 'None' },
                ...cities.
                  filter(c => c !== selectedCity).
                  map(c => ({ value: c, label: c }))
              ]}
            />
          </section>

          <section className="input-row">
            {/* Dataset type (Immigration / Language) */}
            <SelectField
              label="Choose a Dataset:"
              id="dataset-select"
              value={dataType}
              onChange={e => setDataType(e.target.value)}
              options={datasetOptions}
            />

            {/* Period only shown for immigration */}
            {dataType === 'immigration' ?
              <SelectField
                label="Period:"
                id="period-select"
                value={period}
                onChange={e => setPeriod(e.target.value)}
                options={periodOptions}
              />
              :
              <SelectField
                label="Include Official Languages:"
                id="lang-select"
                value={langToggle}
                onChange={e => setLangToggle(e.target.value)}
                options={langToggleOptions}
              />
            }
          </section>

          <section className="input-row">
            {/* Number of entries to display */}
            <SelectField
              label="Result Limit:"
              id="limit-select"
              value={resultLimit}
              onChange={e => setResultLimit(parseInt(e.target.value))}
              options={limitOptions}
            />
          </section>
          <section className="input-row">
            <button type="submit" disabled={!selectedCity || loading}>
              {loading ? 'Loading...' : 'Show Data'}
            </button>
          </section>
        </fieldset>
      </form>

      {/* Display any error messages */}
      <section>{error && <p className="error">{error}</p>}</section>

      {/* Chart visualization */}
      {data && data.length > 0 ? 
        <section className="chart-section">
          <h3>{getChartTitle()}</h3>

          <div className="chart-grid">
            {/* Primary City */}
            <article className="chart-container">
              <CityInfoCard city={activeCity} info={cityInfo} />
              <Chart
                data={primaryData}
                title={`${activeCity} - ${activeDataType}`}
                xLabel="Count"
                yLabel={
                  activeDataType === 'immigration' ? 'Country' : 'Language'
                }
              />
            </article>

            {/* Comparison City */}
            {activeComparisonCity && 
              <article className="chart-container">
                <CityInfoCard
                  city={activeComparisonCity}
                  info={comparisonCityInfo}
                />
                <Chart
                  data={comparisonData}
                  title={`${activeComparisonCity} - ${activeDataType}`}
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
          <h3>Example Data Preview - Immigration Data</h3>
          <div className="chart-grid">
            <article className="chart-container">
              <CityInfoCard
                city="Example City 1"
                info={{
                  Province: 'Example Province',
                  Population: 1999999,
                  AreaKm2: 499.9
                }}
              />
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
            {comparisonCity &&
              <article className="chart-container">
                <CityInfoCard
                  city="Example City 2"
                  info={{
                    Province: 'Example Province',
                    Population: 2999999,
                    AreaKm2: 399.9
                  }}
                />
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
            }
          </div>
        </section>
      }
    </>
  );
}
