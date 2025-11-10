import { useInView } from 'react-intersection-observer';
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
  const options = { threshold: 0.5 };

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

  return (
    <>
      <HeroSection />
      <Map zoomedInCity={currentZoomedCity} />
      <p>
        While English and French are Canada’s official languages, a closer
        look reveals over 200 non-official languages thriving in our
        biggest cities. We will however focus on the 6 city from east to
        west.
      </p>

      <p>
        Canada’s three largest provinces by population (Ontario, Quebec and
        British Columbia) are home to over the majority of the country’s
        immigrant population. Each having it’s own distinct lingustic
        profile shaped on geography and history.
      </p>

      <p>Our journey starts in Halifax, the capital of Nova Scotia.</p>
      <City cityName="halifax" ref={halifaxRef}/>

      <div className="city-divider"></div>

      <p>
        Next, we head to Montreal, the vibrant cultural heart of French
        North America. This city&apos;s identity is defined by its powerful
        Francophone ties. Montreal’s exposure to the world got a huge boost
        from Expo 67, the spectacularly successful World’s Fair. It put
        Montréal on the global stage.
      </p>

      <City cityName="montreal" ref={montrealRef}/>


      <div className="city-divider"></div>

      <p>
        We move west to Toronto, the massive, English-speaking metropolis
        that truly took off after World War II.
      </p>

      <City cityName="toronto" ref={torontoRef}/>
      

      <div className="city-divider"></div>

      <p>
        Now we explore the Prairies with Calgary and Edmonton, two cities
        whose fortunes are tied directly to the earth. Their histories are
        defined by natural resources.
      </p>

      <City cityName="calgary" ref={calgaryRef}/>
      
      <div className="city-divider"></div>

      <p>
        Finally, we land in Vancouver, a stunning city whose identity has
        been completely remade by its role as Canada&apos;s bridge to the
        Pacific.
      </p>

      <City cityName="vancouver" ref={vancouverRef}/>
      
      <div className="city-divider"></div>

      <DataExplorer />
      <Footer />
    </>
  );
}

export default App;
