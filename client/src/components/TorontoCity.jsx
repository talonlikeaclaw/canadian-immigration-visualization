import { useState, useEffect } from 'react';
import '../assets/styles/City.css';
import Chart from './Chart';
import normalizeLanguageData from '../utils/NormalizeLanguageData.js';
import normalizeImmigrationData from '../utils/NormalizeImmigrationData.js';

/**
 * Toronto section that fetches immigration and language data when visible.
 * @param {Object} props
 * @param {boolean} props.cityInView - Whether the section is intersecting the viewport.
 * @param {RefObject<HTMLElement>} props.reference - Ref tied to the section for cityInView,
 * @returns {JSX.Element} Toronto storyline and charts.
 */
function TorontoCity({cityInView, reference}){
  const [cityData, setCityData] = useState({ immigration: [], languages: [] });

  useEffect(()=>{
    if (cityInView){
      // don't fetch data if already fetched
      if (cityData.immigration.length > 0) return;
      if (cityData.languages.length > 0) return;
  
      Promise.all([
        fetch(`/api/immigration/toronto`),
        fetch(`/api/languages/toronto`),
      ]).
        then(([immigrationResponse, languageResponse]) => {
          // Process the responses into JSON concurrently
          return Promise.all([
            immigrationResponse.json(),
            languageResponse.json(),
          ]);
        }).
        then(([immigrationData, languageData]) => {
          // Update the state with the combined data
          const immigrationChartData = normalizeImmigrationData(immigrationData, 20);
          const languagesChartData = normalizeLanguageData(languageData, 20);
          setCityData({ immigration: immigrationChartData, languages: languagesChartData });
        }).
        catch(error => {
          // Handle any errors that occurred in the chain
          console.error(error);
        });
    }
  }, [cityInView, cityData]);
  return (
    <>
      <section className="toronto-section city-section" ref={reference}>
        <p className="transition">
              We move west to Toronto, the massive, English-speaking metropolis
              that truly took off after World War II.
        </p>
        <section className="text-chart-group">
          <section className="text-chart-group__texts">
            <p>
                  During Word War II, Toronto was transformed into a vital
                  industrial city. After the war, Canada needed workers, and the
                  federal government opened the immigration doors wide to fuel the
                  country&apos;s industrial and economic growth.
            </p>
            <p>
                  Toronto then became the ultimate destination! Early waves brought
                  not only European communities like Italians, British and
                  Portuguese, but communities from all over the world from India,
                  Guyana, the Philippines and so much more.
            </p>
          </section>
          <Chart
            data={cityData.immigration}
            title="The Top 20 Countries Driving Immigration (All Time)"
            classes="text-chart-group__chart"
          />
        </section>

        <section className="text-chart-group__left">
          <Chart
            data={cityData.languages} 
            title="Top 20 spoken languages (Excluding English)"
            classes="text-chart-group__chart"
            footerContent={
              `English was removed as a language to 
              allow a better comparaison and analysis of non-offical languages`
            }
          />
          <section className="text-chart-group__texts">
            <p>
              The most spoken non-official language are of Chinese descent, with
              204,420 Mandarin speakers, and 177,950 Cantonese speakers. Punjabi (Panjabi)
              is next with 161,965 speakers. This is followed by Urdu (89,120 speakers) and
              Tamil (83,225 speakers), clearly showing Toronto&apos;s strong
              ties to India, Pakistan, and Sri Lanka. Other large communities
              include speakers of Spanish (78,275), Tagalog (77,925), and
              Iranian Persian (57,085).
            </p>
    
            <p>
              The city quickly transformed from a relatively Anglo-centric
              place to the dynamic, multicultural mosaic it is today. That
              postwar need for labor is why Toronto is now one of the most
              linguistically diverse places on the planet.
            </p>
          </section>
        </section>
      </section>

      <div className="city-divider"></div>
    </>
  );
}

export default TorontoCity;