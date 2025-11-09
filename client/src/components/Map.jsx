import '../assets/styles/Map.css';
import mapSvg from'../assets/images/map.svg';
import map3 from'../assets/images/map-3.svg';
import map4 from'../assets/images/map-4.svg';
import map5 from'../assets/images/map-5.svg';
import map6 from'../assets/images/map-6.svg';
import map14 from'../assets/images/map-14.svg';
import map15 from'../assets/images/map-15.svg';
import map16 from'../assets/images/map-16.svg';
import map17 from'../assets/images/map-17.svg';
import map18 from'../assets/images/map-18.svg';
import map20 from'../assets/images/map-20.svg';
import map21 from'../assets/images/map-21.svg';
import map22 from'../assets/images/map-22.svg';
import map23 from'../assets/images/map-23.svg';
import map24 from'../assets/images/map-24.svg';
import map26 from'../assets/images/map-26.svg';
import map27 from'../assets/images/map-27.svg';
import map28 from'../assets/images/map-28.svg';
import map32 from'../assets/images/map-32.svg';
import map33 from'../assets/images/map-33.svg';
import map34 from'../assets/images/map-34.svg';
import map35 from'../assets/images/map-35.svg';
import map36 from'../assets/images/map-36.svg';

function Map({zoomedInCity = ''}){
  return (
    <section className="map-wrapper">
      {zoomedInCity === '' &&
      <section className="country-map">
        <img src={mapSvg}/>
      </section>
      }
  
      {zoomedInCity === 'halifax' && 
        <section className="city-map">
          <img className="grid-map__item" src={map28}/>
          <img className="grid-map__item" src={map27}/>
          <img className="grid-map__item" src={map26}/>

          <img className="grid-map__item" src={map16}/>
          <img className="grid-map__item" src={map15}/>
          <img className="grid-map__item" src={map14}/>
        </section>
      }

      {zoomedInCity === 'montreal' && 
        <section className="city-map">
          <img className="grid-map__item" src={map17}/>
          <img className="grid-map__item" src={map16}/>
          <img className="grid-map__item" src={map15}/>

          <img className="grid-map__item" src={map5}/>
          <img className="grid-map__item" src={map4}/>
          <img className="grid-map__item" src={map3}/>
        </section>
      }

      {zoomedInCity === 'toronto' && 
        <section className="city-map">
          <img className="grid-map__item" src={map18}/>
          <img className="grid-map__item" src={map17}/>
          <img className="grid-map__item" src={map16}/>

          <img className="grid-map__item" src={map6}/>
          <img className="grid-map__item" src={map5}/>
          <img className="grid-map__item" src={map4}/>
        </section>
      }

      {(zoomedInCity === 'calgary' || zoomedInCity === 'edmonton') && 
        <section className="city-map">
          <img className="grid-map__item" src={map34}/>
          <img className="grid-map__item" src={map33}/>
          <img className="grid-map__item" src={map32}/>

          <img className="grid-map__item" src={map22}/>
          <img className="grid-map__item" src={map21}/>
          <img className="grid-map__item" src={map20}/>
        </section>
      }

      {zoomedInCity === 'vancouver' && 
        <section className="city-map">
          <img className="grid-map__item" src={map36}/>
          <img className="grid-map__item" src={map35}/>
          <img className="grid-map__item" src={map34}/>

          <img className="grid-map__item" src={map24}/>
          <img className="grid-map__item" src={map23}/>
          <img className="grid-map__item" src={map22}/>
        </section>
      }
    </section>
  );
}

export default Map;