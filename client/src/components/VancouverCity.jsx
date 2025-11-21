import { useState, useEffect } from 'react';
import '../assets/styles/City.css';
import Chart from './Chart';
import normalizeLanguageData from '../utils/NormalizeLanguageData.js';
import normalizeImmigrationData from '../utils/NormalizeImmigrationData.js';

/**
 * Vancouver section that lazily fetches immigration and language stats.
 * @param {Object} props
 * @param {boolean} props.cityInView - Whether the section is currently visible.
 * @param {RefObject<HTMLElement>} props.reference - Ref tied to the section for cityInView,
 * @returns {JSX.Element} Vancouver narrative and charts.
 */
function VancouverCity({cityInView, reference}){
  const [cityData, setCityData] = useState({ immigration: [], languages: [] });

  useEffect(()=>{
    if (cityInView){
      // don't fetch data if already fetched
      if (cityData.immigration.length > 0) return;
      if (cityData.languages.length > 0) return;
  
      Promise.all([
        fetch(`/api/immigration/vancouver/period/2001/2005`),
        fetch(`/api/languages/vancouver`),
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
          const immigrationChartData = normalizeImmigrationData(immigrationData);
          const languagesChartData = normalizeLanguageData(languageData);
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

      <section className="vancouver-section city-section" ref={reference}>
        <p className="transition">
              Finally, we land in Vancouver, a stunning city whose identity has
              been completely remade by its role as Canada&apos;s bridge to the
              Pacific.
        </p>
        <section className="text-chart-group">
          <section className="text-chart-group__texts">
            <p>
                  Vancouver had long-standing ties to Asia, but its modern era
                  began in the 1980s. Key events included the international
                  spotlight of Expo 86 and a new immigration program that welcomed
                  wealthy investors.
            </p>
            <p>
                  This coincided perfectly with political uncertainty surrounding
                  the 1997 Handover of Hong Kong to China. Huge numbers of
                  capital-rich immigrants from Hong Kong, and later Mainland China,
                  chose Vancouver as their new home.
            </p>
          </section>
          <Chart
            data={cityData.immigration}
            title="Top 10 Countries Shaping Immigration (2001 - 2005)"
            classes="text-chart-group__chart"
          />
        </section>

        <section className="text-chart-group__left">
          <Chart
            data={cityData.languages}
            title="Top 10 Languages Spoken (Excluding English)"
            classes="text-chart-group__chart"
            footerContent={
              `English was removed as a language to 
              allow a better comparaison and analysis of non-offical languages`
            }
          />
          <section className="text-chart-group__texts">
            <p>
              The list of most common non-official languages reads like a map
              of the Asia-Pacific. Vancouver has substantial populations speaking Mandarin
              (152,810 speakers), Punjabi (Panjabi) (136,300 speakers), Cantonese (131,660),
              Korean (40,045 speakers) and Tagalog (37,890 speakers).
              The city also has a surprisingly large community of Iranian
              Persian speakers (30,985). The prevalence of all these Asian and
              global languages, especially compared to the relatively small
              number of French speakers (8,685), highlights Vancouver&apos;s
              identity as a deeply Pacific-focused global city.
            </p>
    
            <p>
              The 2010 Winter Olympic Games held in Vancouver provided a global
              marketing platform for the city, and reinforced existing
              immigration trends.
            </p>
          </section>
        </section>
      </section>

      <div className="city-divider"></div>
    </>
  );
}
export default VancouverCity;