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
        <img src={countryMap}/>
      </section>
      }
  
      {zoomedInCity === 'halifax' && 
        <section className="city-map">
          <img src={halifax}/>
        </section>
      }

      {zoomedInCity === 'montreal' && 
        <section className="city-map">
          <img src={montreal}/>
        </section>
      }

      {zoomedInCity === 'toronto' && 
        <section className="city-map">
          <img src={toronto}/>
        </section>
      }

      {(zoomedInCity === 'calgary' || zoomedInCity === 'edmonton') && 
        <section className="city-map">
          <img src={calgary}/>
        </section>
      }

      {zoomedInCity === 'vancouver' && 
        <section className="city-map">
          <img src={vancouver}/>
        </section>
      }
    </section>
  );
}

export default Map;