import { useState, useEffect } from 'react';
import '../assets/styles/City.css';
import Chart from './Chart';

function VancouverCity({cityInView, reference}){
  const [cityData, setCityData] = useState({ immigration: [], languages: [] });

  const immigrationChartData = convertImmigrationDataObjectToArray(cityData);
  const languagesChartData = simplifyLanguageArray(cityData);

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
          setCityData({ immigration: immigrationData, languages: languageData });
        }).
        catch(error => {
          // Handle any errors that occurred in the chain
          console.error(error);
        });
    }
  }, [cityInView, cityData]);
  return (
    <>
      <p className="transition">
            Finally, we land in Vancouver, a stunning city whose identity has
            been completely remade by its role as Canada&apos;s bridge to the
            Pacific.
      </p>

      <section className="vancouver-section city-section" ref={reference}>
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
            data={immigrationChartData}
            title="Top 10 Countries Shaping Immigration (2001 - 2005)"
            classes="text-chart-group__chart"
          />
        </section>

        <section className="text-chart-group__left">
          <Chart
            data={languagesChartData}
            title="Languages Spoken"
            classes="text-chart-group__chart"
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

function convertImmigrationDataObjectToArray(cityDataObj){
  let immigrationData = [];
  
  if (cityDataObj.immigration.length !== 0){
    immigrationData = cityDataObj.immigration.countries;
  }

  const immigrationEntries = Object.entries(immigrationData);

  const immigrationChartData = immigrationEntries.map(([countryName, value]) => ({
    label: countryName,
    value: value
  }));

  immigrationChartData.length = 10;

  return immigrationChartData;
}

function simplifyLanguageArray(cityDataObj){
  let languagesData = [];


  if (cityDataObj.languages.length !== 0){
    languagesData = cityDataObj.languages.map(data =>{
      return {
        label: data.Language,
        value: data.Count
      };
    });
  }

  languagesData.length = 10;

  return languagesData;
}

export default VancouverCity;