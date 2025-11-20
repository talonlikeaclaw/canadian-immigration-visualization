import { useMemo, useState } from 'react';
import Chart from './Chart';
import CityInfoCard from './CityInfoCard';
import SelectField from './SelectField';
import '../assets/styles/DataExplorer.css';

export default function DataExplorer() {
  // Form state (user is editing)
  const [formState, setFormState] = useState({
    city: 'Montréal',
    comparisonCity: '',
    dataType: 'immigration',
    period: 'All time',
    languageToggle: 'Include',
    resultLimit: 10
  });

  // Active state (what is displayed)
  const [activeState, setActiveState] = useState({
    city: '',
    comparisonCity: '',
    dataType: 'immigration',
    period: 'All time',
    languageToggle: 'Include',
    resultLimit: 10
  });

  // Data state
  const [data, setData] = useState(null);
  const [cityInfo, setCityInfo] = useState(null);
  const [comparisonCityInfo, setComparisonCityInfo] = useState(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const primaryData = useMemo(
    () =>
      data && activeState.city
        ? data.filter(d => d.city === activeState.city)
        : [],
    [data, activeState.city]
  );

  const comparisonData = useMemo(
    () =>
      data && activeState.comparisonCity
        ? data.filter(d => d.city === activeState.comparisonCity)
        : [],
    [data, activeState.comparisonCity]
  );

  const getChartTitle = () => {
    const cities = activeState.comparisonCity
      ? `${activeState.city} vs ${activeState.comparisonCity}`
      : activeState.city;
    const dataset =
      activeState.dataType.charAt(0).toUpperCase() +
      activeState.dataType.slice(1);
    const period =
      activeState.dataType === 'immigration' &&
      activeState.period !== 'All time'
        ? ` (${activeState.period})`
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
  }

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

  // Helper to check if request is same as previous
  const isSameRequest = () =>
    JSON.stringify(formState) === JSON.stringify(activeState);

  // Updates the controlled form fields
  const updateForm = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Handles form submission: fetches city info and dataset
   * based on current selections (city, dataset type, and period).
   */
  async function handleSubmit(e) {
    e.preventDefault();

    // Ensure city is selected
    if (!formState.city) {
      setError('Please select at least one city.');
      return;
    }

    // Prevent refetching if same request
    if (isSameRequest()) {
      return;
    }

    // Reset error and show loading
    setError('');
    setLoading(true);

    try {
      const promises = [];
      const fetchIndex = {};

      // Check if we need to fetch city data
      const cityChanged = formState.city !== activeState.city;

      const dataParamsChanged =
        formState.dataType !== activeState.dataType ||
        formState.period !== activeState.period ||
        formState.languageToggle !== activeState.languageToggle ||
        formState.resultLimit !== activeState.resultLimit;

      // Fetch primary city info if city changed
      if (cityChanged) {
        fetchIndex.cityInfo = promises.length;
        promises.push(
          fetch(`/api/city/${encodeURIComponent(formState.city)}`).then(
            r => r.json()
          )
        );
      }

      // Fetch primary dataset if city changed or data params changed
      if (cityChanged || dataParamsChanged) {
        fetchIndex.primaryData = promises.length;
        promises.push(
          fetchDataset(
            formState.city,
            formState.dataType,
            formState.period,
            formState.languageToggle
          )
        );
      }

      // Check if we need to fetch comparison city data
      const comparisonCityChanged =
        formState.comparisonCity !== activeState.comparisonCity;

      // Fetch comparison city info if it exists and changed
      if (formState.comparisonCity && comparisonCityChanged) {
        fetchIndex.comparisonCityInfo = promises.length;
        promises.push(
          fetch(
            `/api/city/${encodeURIComponent(formState.comparisonCity)}`
          ).then(r => r.json())
        );
      }

      if (
        formState.comparisonCity &&
        (comparisonCityChanged || dataParamsChanged)
      ) {
        fetchIndex.comparisonData = promises.length;
        promises.push(
          fetchDataset(
            formState.comparisonCity,
            formState.dataType,
            formState.period,
            formState.languageToggle
          )
        );
      }

      // Fetch all needed data
      const results = await Promise.all(promises);

      // Update city info only if we fetched it
      if (fetchIndex.cityInfo !== undefined) {
        setCityInfo(results[fetchIndex.cityInfo]);
      }

      // Update comparison city info only if we fetched it, or clear if no comparison city
      if (fetchIndex.comparisonCityInfo !== undefined) {
        setComparisonCityInfo(results[fetchIndex.comparisonCityInfo]);
      } else if (!formState.comparisonCity) {
        setComparisonCityInfo(null);
      }

      // Get primary data (either newly fetched or filter from existing)
      let primaryDataArray;
      if (fetchIndex.primaryData !== undefined) {
        primaryDataArray = results[fetchIndex.primaryData];
      } else {
        // Use existing data for this city
        primaryDataArray = data
          ? data.filter(d => d.city === formState.city)
          : [];
      }

      // Get comparison data (either newly fetched or filter from existing)
      let comparisonDataArray = [];
      if (formState.comparisonCity) {
        if (fetchIndex.comparisonData !== undefined) {
          comparisonDataArray = results[fetchIndex.comparisonData];
        } else {
          // Use existing data for this city
          comparisonDataArray = data
            ? data.filter(d => d.city === formState.comparisonCity)
            : [];
        }
      }

      // Combine and set data
      const combined = [
        ...primaryDataArray.
          slice(0, formState.resultLimit).
          map(d => ({ ...d, city: formState.city })),
        ...comparisonDataArray.
          slice(0, formState.resultLimit).
          map(d => ({ ...d, city: formState.comparisonCity }))
      ];

      // Commit form selections
      setActiveState(formState);
      setData(combined);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
  }

  /**
   * The Chart component does not render when no data is passed in.
   * This function creates empty data with the right amount of entries
   * to improve the animation during loading with chart.js.
   * @param {number} resultLimit - The amount of empty results to create.
   * @returns {Array<{label: string, value: number}>} An array of empty data objects.
   */
  function createEmptyData(resultLimit) {
    const emptyData = [];
    const placeholder =
      formState.dataType === 'immigration'
        ? 'Loading Immigration Data...'
        : 'Loading Language Data...';

    for (let i = 0; i < resultLimit; i++) {
      const label = i === 0 ? placeholder : '';
      emptyData.push({ label: label, value: 0 });
    }
    return emptyData;
  }

  return (
    <section className="data-explorer-section">
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
              value={formState.city}
              onChange={e => updateForm('city', e.target.value)}
              options={cityOptions}
            />
            <SelectField
              label="Secondary City (Optional):"
              id="comparison-select"
              value={formState.comparisonCity}
              onChange={e => updateForm('comparisonCity', e.target.value)}
              options={[
                { value: '', label: 'None' },
                ...cities.
                  filter(c => c !== formState.city).
                  map(c => ({ value: c, label: c }))
              ]}
            />
          </section>

          <section className="input-row">
            {/* Dataset type (Immigration / Language) */}
            <SelectField
              label="Choose a Dataset:"
              id="dataset-select"
              value={formState.dataType}
              onChange={e => updateForm('dataType', e.target.value)}
              options={datasetOptions}
            />

            {/* Period only shown for immigration */}
            {formState.dataType === 'immigration' ? 
              <SelectField
                label="Period:"
                id="period-select"
                value={formState.period}
                onChange={e => updateForm('period', e.target.value)}
                options={periodOptions}
              />
              : 
              <SelectField
                label="Include Official Languages:"
                id="lang-select"
                value={formState.languageToggle}
                onChange={e =>
                  updateForm('languageToggle', e.target.value)
                }
                options={langToggleOptions}
              />
            }
          </section>

          <section className="input-row">
            {/* Number of entries to display */}
            <SelectField
              label="Result Limit:"
              id="limit-select"
              value={formState.resultLimit}
              onChange={e =>
                updateForm('resultLimit', parseInt(e.target.value))
              }
              options={limitOptions}
            />
          </section>
          <section className="input-row">
            <button type="submit" disabled={!formState.city || loading}>
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
              <CityInfoCard city={activeState.city} info={cityInfo} />
              <Chart
                data={primaryData}
                title={`${activeState.city} - ${activeState.dataType}`}
                yLabel="Count"
                xLabel={
                  activeState.dataType === 'immigration'
                    ? 'Country'
                    : 'Language'
                }
              />
            </article>

            {/* Comparison City */}
            {activeState.comparisonCity && 
              <article className="chart-container">
                <CityInfoCard
                  city={activeState.comparisonCity}
                  info={comparisonCityInfo}
                />
                <Chart
                  data={comparisonData}
                  title={`${activeState.comparisonCity} - ${activeState.dataType}`}
                  yLabel="Count"
                  xLabel={
                    activeState.dataType === 'immigration'
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
          <header className="header-wrapper">
            <h3>
              {loading
                ? 'Loading... Please Wait!'
                : 'Example Data Preview - Sample Data'}
            </h3>
          </header>
          <div className="chart-grid">
            <article className="chart-container">
              <CityInfoCard
                city={loading ? 'Loading...' : 'Example City 1'}
                info={EXAMPLE_CITY_INFO_1}
              />
              <Chart
                data={
                  loading
                    ? createEmptyData(formState.resultLimit)
                    : EXAMPLE_IMMIGRATION_DATA
                }
                title={
                  loading
                    ? 'Loading... Please wait!'
                    : 'Sample Immigration Data'
                }
                yLabel={loading ? 'Loading...' : 'Count'}
                xLabel={loading ? 'Loading...' : 'Immigration'}
              />
            </article>
            {formState.comparisonCity && 
              <article className="chart-container">
                <CityInfoCard
                  city={loading ? 'Loading...' : 'Example City 2'}
                  info={EXAMPLE_CITY_INFO_2}
                />
                <Chart
                  data={
                    loading
                      ? createEmptyData(formState.resultLimit)
                      : EXAMPLE_LANGUAGE_DATA
                  }
                  title={
                    loading
                      ? 'Loading... Please wait!'
                      : 'Sample Language Data'
                  }
                  yLabel={loading ? 'Loading...' : 'Count'}
                  xLabel={loading ? 'Loading...' : 'Language'}
                />
              </article>
            }
          </div>
        </section>
      }
    </section>
  );
}

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

const EXAMPLE_IMMIGRATION_DATA = [
  { label: 'India', value: 4200 },
  { label: 'China', value: 3800 },
  { label: 'Philippines', value: 2500 },
  { label: 'United Kingdom', value: 1900 },
  { label: 'France', value: 1600 }
];

const EXAMPLE_LANGUAGE_DATA = [
  { label: 'English', value: 850000 },
  { label: 'French', value: 600000 },
  { label: 'Mandarin', value: 95000 },
  { label: 'Arabic', value: 72000 },
  { label: 'Spanish', value: 65000 }
];

const EXAMPLE_CITY_INFO_1 = {
  Province: 'Example Province',
  Population: 1999999,
  AreaKm2: 499.9
};

const EXAMPLE_CITY_INFO_2 = {
  Province: 'Example Province',
  Population: 2999999,
  AreaKm2: 399.9
};
