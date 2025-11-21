import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import '../assets/styles/App.css';
import HeroSection from './HeroSection';
import whiteCurve from '../assets/images/white-curve.webp';
import Map from './Map';
import HalifaxCity from './HalifaxCity';
import MontrealCity from './MontrealCity';
import TorontoCity from './TorontoCity';
import CalgaryCity from './CalgaryCity';
import VancouverCity from './VancouverCity';
import DataExplorer from './DataExplorer';
import Footer from './Footer';

/**
 * Root application component that wires together the hero, map, city sections,
 * and data explorer while tracking which city card is in view for updating the map.
 * @returns {JSX.Element} Rendered application layout.
 */
function App() {
  // A google search on how I can track the position of React elements
  // lead me to the react intersection observer (plus I think this was
  // in one of class lectures, with lazy loading)
  // https://www.npmjs.com/package/react-intersection-observer
  const options = { threshold: 0.1 };

  const { ref: halifaxRef, inView: halifaxInView } = useInView(options);
  const { ref: montrealRef, inView: montrealInView } = useInView(options);
  const { ref: torontoRef, inView: torontoInView } = useInView(options);
  const { ref: calgaryRef, inView: calgaryInView } = useInView(options);
  const { ref: vancouverRef, inView: vancouverInView } =
    useInView(options);

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

  // Keeps track of which cities have been in view to enable lazy loadings
  const [renderedCity, setRenderedCity] = useState({
    halifax: true,
    montreal: false,
    toronto: false,
    calgary: false,
    vancouver: false
  });

  /* Manually lazy load using useEffect because react-intersection-observer
  does npt play nicely with lazy/Suspense fall back elements. */
  useEffect(() => {
    if (
      currentZoomedCity === 'halifax' &&
      renderedCity.montreal === false
    ) {
      setRenderedCity(prev => ({ ...prev, montreal: true }));
    }
    if (
      currentZoomedCity === 'montreal' &&
      renderedCity.toronto === false
    ) {
      setRenderedCity(prev => ({ ...prev, toronto: true }));
    }
    if (
      currentZoomedCity === 'toronto' &&
      renderedCity.calgary === false
    ) {
      setRenderedCity(prev => ({ ...prev, calgary: true }));
    }
    if (
      currentZoomedCity === 'calgary' &&
      renderedCity.vancouver === false
    ) {
      setRenderedCity(prev => ({ ...prev, vancouver: true }));
    }
  }, [currentZoomedCity, renderedCity]);

  /**
   * Renders introductory context that frames the coast-to-coast narrative.
   * @returns {JSX.Element} Introductory copy for the experience.
   */
  function displayContextText() {
    return (
      <section className="context-text">
        <p>
          While English and French are Canada’s official languages, a
          closer look reveals over 200 non-official languages thriving in
          our biggest cities. We will however focus on 6 cities across the
          country, from east to west.
        </p>

        <p>
          Canada’s three largest provinces by population (Ontario, Quebec
          and British Columbia) are home to over the majority of the
          country’s immigrant population. Each having it’s own distinct
          linguistic profile shaped on geography and history.
        </p>
      </section>
    );
  }

  return (
    <>
      <HeroSection />
      <section className="scroll-content">
        <img src={whiteCurve} alt="white curve" className="white-curve" />

        <Map zoomedInCity={currentZoomedCity} />

        {displayContextText()}
        {renderedCity.halifax && 
          <HalifaxCity cityInView={halifaxInView} reference={halifaxRef} />
        }
        {renderedCity.montreal && 
          <MontrealCity
            cityInView={montrealInView}
            reference={montrealRef}
          />
        }
        {renderedCity.toronto && 
          <TorontoCity cityInView={torontoInView} reference={torontoRef} />
        }
        {renderedCity.calgary && 
          <CalgaryCity cityInView={calgaryInView} reference={calgaryRef} />
        }
        {renderedCity.vancouver && 
          <>
            <VancouverCity
              cityInView={vancouverInView}
              reference={vancouverRef}
            />
            <DataExplorer />
            <Footer />
          </>
        }
      </section>
    </>
  );
}
export default App;
