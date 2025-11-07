import { useState } from 'react';
import '../assets/styles/App.css';
import HeroSection from './HeroSection';
import Chart from './Chart';
import Footer from './Footert';

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

      <Footer/>
    </>
  );
}

export default App;
