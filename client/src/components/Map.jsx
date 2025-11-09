import '../assets/styles/Map.css';
// import mapSvg from'../assets/images/map.svg';
import map1 from'../assets/images/map-1.svg';
import map2 from'../assets/images/map-2.svg';
import map3 from'../assets/images/map-3.svg';
import map4 from'../assets/images/map-4.svg';
import map5 from'../assets/images/map-5.svg';
import map6 from'../assets/images/map-6.svg';
import map7 from'../assets/images/map-7.svg';
import map8 from'../assets/images/map-8.svg';
import map9 from'../assets/images/map-9.svg';
import map10 from'../assets/images/map-10.svg';
import map11 from'../assets/images/map-11.svg';
import map12 from'../assets/images/map-12.svg';
import map13 from'../assets/images/map-13.svg';
import map14 from'../assets/images/map-14.svg';
import map15 from'../assets/images/map-15.svg';
import map16 from'../assets/images/map-16.svg';
import map17 from'../assets/images/map-17.svg';
import map18 from'../assets/images/map-18.svg';
import map19 from'../assets/images/map-19.svg';
import map20 from'../assets/images/map-20.svg';
import map21 from'../assets/images/map-21.svg';
import map22 from'../assets/images/map-22.svg';
import map23 from'../assets/images/map-23.svg';
import map24 from'../assets/images/map-24.svg';
import map25 from'../assets/images/map-25.svg';
import map26 from'../assets/images/map-26.svg';
import map27 from'../assets/images/map-27.svg';
import map28 from'../assets/images/map-28.svg';
import map29 from'../assets/images/map-29.svg';
import map30 from'../assets/images/map-30.svg';
import map31 from'../assets/images/map-31.svg';
import map32 from'../assets/images/map-32.svg';
import map33 from'../assets/images/map-33.svg';
import map34 from'../assets/images/map-34.svg';
import map35 from'../assets/images/map-35.svg';
import map36 from'../assets/images/map-36.svg';
import upperMap from'../assets/images/map-upper-half.svg';

function Map({zoomedInCity = 'vancouver'}){
  return (
    <>
      {zoomedInCity === '' &&
        <section className="country-map">
          <img className="upper-map" src={upperMap} alt="" />
          <section className="grid-map">
            <img className="grid-map__item" src={map36}/>
            <img className="grid-map__item" src={map35}/>
            <img className="grid-map__item" src={map34}/>
            <img className="grid-map__item" src={map33}/>
            <img className="grid-map__item" src={map32}/>
            <img className="grid-map__item" src={map31}/>
            <img className="grid-map__item" src={map30}/>
            <img className="grid-map__item" src={map29}/>
            <img className="grid-map__item" src={map28}/>
            <img className="grid-map__item" src={map27}/>
            <img className="grid-map__item" src={map26}/>
            <img className="grid-map__item" src={map25}/>
            <img className="grid-map__item" src={map24}/>
            <img className="grid-map__item" src={map23}/>
            <img className="grid-map__item" src={map22}/>
            <img className="grid-map__item" src={map21}/>
            <img className="grid-map__item" src={map20}/>
            <img className="grid-map__item" src={map19}/>
            <img className="grid-map__item" src={map18}/>
            <img className="grid-map__item" src={map17}/>
            <img className="grid-map__item" src={map16}/>
            <img className="grid-map__item" src={map15}/>
            <img className="grid-map__item" src={map14}/>
            <img className="grid-map__item" src={map13}/>
            <img className="grid-map__item" src={map12}/>
            <img className="grid-map__item" src={map11}/>
            <img className="grid-map__item" src={map10}/>
            <img className="grid-map__item" src={map9}/>
            <img className="grid-map__item" src={map8}/>
            <img className="grid-map__item" src={map7}/>
            <img className="grid-map__item" src={map6}/>
            <img className="grid-map__item" src={map5}/>
            <img className="grid-map__item" src={map4}/>
            <img className="grid-map__item" src={map3}/>
            <img className="grid-map__item" src={map2}/>
            <img className="grid-map__item" src={map1}/>
          </section>
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
    </>
  );
}

export default Map;