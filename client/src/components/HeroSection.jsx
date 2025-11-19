import '../assets/styles/HeroSection.css';
import arrow from'../assets/images/arrow.svg';
import blueWaves from '../assets/images/blue_waves.webp';


function HeroSection(){
  return(
    <section className="hero-section">
      <img src={blueWaves} alt="gradiant blue waves" className="blue-waves" />
      <section className="hero-section__content">
        <h1>A Linguistic Journey from Coast to Coast</h1>
        <section className="mini-intro">
          <p> 
            Immigration has always shaped Canada, 
            but the nature of that impact is distinct in every region.
          </p>
          <p>
            Follow us on a geographic journey across Canada, 
            starting in the Maritime provinces and moving westward to the Pacific
            as we learn about vibrant, diverse language communities that define our largest cities, 
            revealing how global migration has reshaped Canada&apos;s identity in the 21st century.
          </p>
        </section>

        <section className="scroll">
          <p>Scroll to begin journey</p>
          <img src={arrow} alt="downwards facing arrow" />
        </section>
      </section>

    </section>
  );
}

export default HeroSection;