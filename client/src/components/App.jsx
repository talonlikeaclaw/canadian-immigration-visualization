import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
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

  // fetch Halifax info when Halifax section is in view
  useEffect(()=>{
    // don't fetch data if already fetched
    if (cityData['halifax']) return;

    Promise.all([
      fetch(`/api/immigration/halifax`),
      fetch(`/api/languages/halifax`),
    ]).
      then(([immigrationResponse, languageResponse]) => {
        // Process the responses into JSON concurrently
        return Promise.all([
          immigrationResponse.json(),
          languageResponse.json(),
        ]);
      }).
      then(([immigrationData, languageData]) => {
        // Update the state with the combined data
        setCityData(prevData => ({
          ...prevData,
          ['halifax']: { immigration: immigrationData, languages: languageData },
        }));
      }).
      catch(error => {
        // Handle any errors that occurred in the chain
        console.error(error);
      });
  }, [halifaxInView, cityData]);

  // fetch Montreal info when Montreal section is in view
  useEffect(()=>{
    // don't fetch data if already fetched
    if (cityData['montreal']) return;

    Promise.all([
      fetch(`/api/immigration/montréal`),
      fetch(`/api/languages/montréal`),
    ]).
      then(([immigrationResponse, languageResponse]) => {
        // Process the responses into JSON concurrently
        return Promise.all([
          immigrationResponse.json(),
          languageResponse.json(),
        ]);
      }).
      then(([immigrationData, languageData]) => {
        // Update the state with the combined data
        setCityData(prevData => ({
          ...prevData,
          ['montreal']: { immigration: immigrationData, languages: languageData },
        }));
      }).
      catch(error => {
        // Handle any errors that occurred in the chain
        console.error(error);
      });
  }, [montrealInView, cityData]);

  // fetch Toronto info when Toronto section is in view
  useEffect(()=>{
    // don't fetch data if already fetched
    if (cityData['toronto']) return;

    Promise.all([
      fetch(`/api/immigration/toronto`),
      fetch(`/api/languages/toronto`),
    ]).
      then(([immigrationResponse, languageResponse]) => {
        // Process the responses into JSON concurrently
        return Promise.all([
          immigrationResponse.json(),
          languageResponse.json(),
        ]);
      }).
      then(([immigrationData, languageData]) => {
        // Update the state with the combined data
        setCityData(prevData => ({
          ...prevData,
          ['toronto']: { immigration: immigrationData, languages: languageData },
        }));
      }).
      catch(error => {
        // Handle any errors that occurred in the chain
        console.error(error);
      });
  }, [torontoInView, cityData]);

  // fetch Calgary info when Calgary section is in view
  useEffect(()=>{
    // don't fetch data if already fetched
    if (cityData['calgary']) return;

    Promise.all([
      fetch(`/api/immigration/calgary`),
      fetch(`/api/languages/calgary`),
    ]).
      then(([immigrationResponse, languageResponse]) => {
        // Process the responses into JSON concurrently
        return Promise.all([
          immigrationResponse.json(),
          languageResponse.json(),
        ]);
      }).
      then(([immigrationData, languageData]) => {
        // Update the state with the combined data
        setCityData(prevData => ({
          ...prevData,
          ['calgary']: { immigration: immigrationData, languages: languageData },
        }));
      }).
      catch(error => {
        // Handle any errors that occurred in the chain
        console.error(error);
      });
  }, [calgaryInView, cityData]);

  // fetch Vancouver info when Vancouver section is in view
  useEffect(()=>{
    // don't fetch data if already fetched
    if (cityData['vancouver']) return;

    Promise.all([
      fetch(`/api/immigration/vancouver`),
      fetch(`/api/languages/vancouver`),
    ]).
      then(([immigrationResponse, languageResponse]) => {
        // Process the responses into JSON concurrently
        return Promise.all([
          immigrationResponse.json(),
          languageResponse.json(),
        ]);
      }).
      then(([immigrationData, languageData]) => {
        // Update the state with the combined data
        setCityData(prevData => ({
          ...prevData,
          ['vancouver']: { immigration: immigrationData, languages: languageData },
        }));
      }).
      catch(error => {
        // Handle any errors that occurred in the chain
        console.error(error);
      });
  }, [vancouverInView, cityData]);

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
