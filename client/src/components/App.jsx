import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import '../assets/styles/App.css';
import HeroSection from './HeroSection';
import DataExplorer from './DataExplorer';
import Map from './Map';
import City from './City';
import Footer from './Footer';

function App() {
  // A google search on how I can track the position of React elements
  // lead me to the react intersction observer (plus I think this was
  // in one of class lectures, with lazy loading)
  // https://www.npmjs.com/package/react-intersection-observer
  const options = { threshold: 0.15 };

  const { ref: halifaxRef, inView: halifaxInView } = useInView(options);
  const { ref: montrealRef, inView: montrealInView } = useInView(options);
  const { ref: torontoRef, inView: torontoInView } = useInView(options);
  const { ref: calgaryRef, inView: calgaryInView } = useInView(options);
  const { ref: vancouverRef, inView: vancouverInView } =
    useInView(options);

  const [cityData, setCityData] = useState({
    halifax: null,
    montreal: null,
    toronto: null,
    calgary: null,
    vancouver: null,
  });

  // Determine the currently zoomed city based on scroll position
  const currentZoomedCity = vancouverInView
    ? 'vancouver'
    : calgaryInView
      ? 'calgary'
      : torontoInView
        ? 'toronto'
        : montrealInView
          ? 'montreal'
          : halifaxInView
            ? 'halifax'
            : '';
  
  /**
   * @returns two paragraphs that introduce our story
   */
  function displayContextText(){
    return (
      <section className="context-text-wrapper">
        <section className="context-text">
          <p>
          While English and French are Canada’s official languages, a closer
          look reveals over 200 non-official languages thriving in our
          biggest cities. We will however focus on 6 cities across the country, from east to
          west.
          </p>

          <p>
          Canada’s three largest provinces by population (Ontario, Quebec and
          British Columbia) are home to over the majority of the country’s
          immigrant population. Each having it’s own distinct lingustic
          profile shaped on geography and history.
          </p>
        </section>

      </section>
    );
  }

  /**
   * Fetches data for a specific city and updates the state.
   * @param {string} cityKey - The key for the city (montreal)
   * @param {string} apiName - The city name for the API endpoint (montréal)
   */
  const fetchCityData = async (cityKey, apiName) => {
    // don't fetch data if already fetched
    if (cityData[cityKey]) return;

    try {
      const [immigrationResponse, languageResponse] = await Promise.all([
        fetch(`/api/immigration/${apiName}`),
        fetch(`/api/languages/${apiName}`),
      ]);

      const [immigrationData, languageData] = await Promise.all([
        immigrationResponse.json(),
        languageResponse.json(),
      ]);

      setCityData(prevData => ({
        ...prevData,
        [cityKey]: { immigration: immigrationData, languages: languageData },
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <HeroSection />
      <Map zoomedInCity={currentZoomedCity} />

      {displayContextText()}

      <City cityName="halifax" ref={halifaxRef} cityData={cityData.halifax}/>
      <City cityName="montreal" ref={montrealRef} cityData={cityData.montreal}/>
      <City cityName="toronto" ref={torontoRef} cityData={cityData.toronto}/>
      <City cityName="calgary" ref={calgaryRef} cityData={cityData.calgary}/>
      <City cityName="vancouver" ref={vancouverRef} cityData={cityData.vancouver}/>

      <DataExplorer />
      <Footer />
    </>
  );
}

export default App;
