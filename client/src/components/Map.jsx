import '../assets/styles/Map.css';
import countryMap from'../assets/images/map.jpg';
import halifax from'../assets/images/halifax.jpg';
import montreal from'../assets/images/montreal.jpg';
import toronto from'../assets/images/toronto.jpg';
import calgary from'../assets/images/calgary.jpg';
import vancouver from'../assets/images/vancouver.jpg';

function Map({zoomedInCity = ''}){
  return (
    <section className="map-wrapper">
      {zoomedInCity === '' &&
      <section className="country-map">
        <img src={countryMap} alt="Map of Canada"/>
      </section>
      }
  
      {zoomedInCity === 'halifax' && 
        <section className="city-map">
          <img src={halifax} alt="Map of Halifax"/>
        </section>
      }

      {zoomedInCity === 'montreal' && 
        <section className="city-map">
          <img src={montreal} alt="Map of Montreal"/>
        </section>
      }

      {zoomedInCity === 'toronto' && 
        <section className="city-map">
          <img src={toronto} alt="Map of Toronto"/>
        </section>
      }

      {(zoomedInCity === 'calgary' || zoomedInCity === 'edmonton') && 
        <section className="city-map">
          <img src={calgary} alt="Map of Alberta, showing both Calgary and Edmonton"/>
        </section>
      }

      {zoomedInCity === 'vancouver' && 
        <section className="city-map">
          <img src={vancouver} alt="Map of Vancouver"/>
        </section>
      }
    </section>
  );
}

export default Map;