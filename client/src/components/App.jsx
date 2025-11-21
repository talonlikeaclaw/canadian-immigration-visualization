import {lazy, Suspense, memo} from 'react';
import { useInView } from 'react-intersection-observer';
import '../assets/styles/App.css';
import HeroSection from './HeroSection';
const DataExplorer = lazy( ()=> import('./DataExplorer') );
const MemoizedDataExplorer = memo(DataExplorer); 
const Map = lazy( ()=> import('./Map') );
import HalifaxCity from './HalifaxCity';
const MontrealCity = lazy( () => import('./MontrealCity') ); 
const TorontoCity = lazy( ()=>  import('./TorontoCity') );
const CalgaryCity = lazy( () => import('./CalgaryCity') );
const VancouverCity = lazy( () => import('./VancouverCity') );
const Footer = lazy( ()=> import('./Footer') );
import whiteCurve from '../assets/images/white-curve.webp';

function App() {
  // A google search on how I can track the position of React elements
  // lead me to the react intersction observer (plus I think this was
  // in one of class lectures, with lazy loading)
  // https://www.npmjs.com/package/react-intersection-observer
  const options = {threshold: 0.1};

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
  
  /**
   * @returns two paragraphs that introduce our story
   */
  function displayContextText(){
    return (
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
    );
  }


  return (
    <>
      <HeroSection />
      <section className="scroll-content">
        <img src={whiteCurve} alt="white curve"  className="white-curve"/>

        <Suspense fallback={<p>Loading Map...</p>}>
          <Map zoomedInCity={currentZoomedCity} />
        </Suspense>

        {displayContextText()}

        <HalifaxCity cityInView={halifaxInView} reference={halifaxRef}/>

        <Suspense fallback={<p>Loading Montréal...</p>}>
          <MontrealCity cityInView={montrealInView} reference={montrealRef}/>
        </Suspense>

        <Suspense fallback={<p>Loading Toronto...</p>}>
          <TorontoCity cityInView={torontoInView} reference={torontoRef}/>
        </Suspense>

        <Suspense fallback={<p>Loading Calgary...</p>}>
          <CalgaryCity cityInView={calgaryInView} reference={calgaryRef}/>
        </Suspense>

        <Suspense fallback={<p>Loading Vancouver...</p>}>
          <VancouverCity cityInView={vancouverInView} reference={vancouverRef}/>
        </Suspense>

        <Suspense fallback= {<p> Loading Data Explorer</p>}>
          <MemoizedDataExplorer />
        </Suspense>

        <Suspense fallback= {<p> Loading Data Footer</p>}>
          <Footer />
        </Suspense>
      </section>
    </>
  );
}
export default App;
