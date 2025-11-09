import { useInView } from 'react-intersection-observer'; 
import '../assets/styles/App.css';
import HeroSection from './HeroSection';
import Chart from './Chart';
import Map from './Map';
import Footer from './Footer';

function App() {  
  // A google search on how I can track the position of React elements
  // lead me to the react intersction observer (plus I think this was
  // in one of class lectures, with lazy loading)
  // https://www.npmjs.com/package/react-intersection-observer
  const { ref: halifaxRef, inView: halifaxInView } = useInView();

  // Determine the currently zoomed city based on scroll position
  const currentZoomedCity = halifaxInView ? 'halifax' : '';

  return (
    <>
      <HeroSection></HeroSection>
      {/* <section className="citySelect">
        <label htmlFor="cities">Select a city:</label>
        <select name="cities" id="cities" onChange={(e) => onChangehandler(e) }>
          <option value="Halifax">Halifax</option>
          <option value="Montréal">Montréal</option>
          <option value="Toronto">Toronto</option>
          <option value="Calgary">Calgary</option>
          <option value="Edmonton">Edmonton</option>
          <option value="Vancouver">Vancouver</option>
        </select>
      </section>
      <Chart city={city}></Chart> */}

      <h1>Canada</h1>
      <Map/>

      <h2>Halifax</h2>
      <Map zoomedInCity="halifax"/>

      <h2>Montreal</h2>
      <Map zoomedInCity="montreal"/>

      <h2>Toronto</h2>
      <Map zoomedInCity="toronto"/>

      <h2>Calgary and Edmonton</h2>
      <Map zoomedInCity="calgary"/>

      <h2>Vancouver</h2>
      <Map zoomedInCity="vancouver"/>
      <Footer/>
    </>
  );
}

export default App;