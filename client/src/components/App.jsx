import { useState } from 'react';
import '../assets/styles/App.css';
import HeroSection from './HeroSection';
import Chart from './Chart';
import Map from './Map';
import Footer from './Footer';

function App() {
  const [city, setCity] = useState('Halifax');
  function onChangehandler(e){
    setCity(e.target.value);
  }

  return (
    <>
      <HeroSection></HeroSection>
      <section className="citySelect">
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
      <Chart city={city}></Chart>

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
