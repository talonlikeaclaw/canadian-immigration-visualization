import { useState, useEffect } from 'react';
import '../assets/styles/City.css';
import Chart from './Chart';

function CalgaryCity({cityInView, reference}){
  const [cityData, setCityData] = useState({ immigration: [], languages: [] });

  const immigrationChartData = convertImmigrationDataObjectToArray(cityData);
  const languagesChartData = simplifyLanguageArray(cityData);

  useEffect(()=>{
    if (cityInView){
      // don't fetch data if already fetched
      if (cityData.immigration.length > 0) return;
      if (cityData.languages.length > 0) return;
  
      Promise.all([
        fetch(`/api/immigration/calgary`),
        fetch(`/api/languages/calgary`),
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
        Now we explore the Prairies with Calgary and Edmonton, two cities
        whose fortunes are tied directly to the earth. Their histories are
        defined by natural resources.
      </p>

      <section className="calgary-section city-section" ref={reference}>
        <p>
          While the region started with agriculture, the real game-changer
          was oil and gas. The discovery of major fields in the mid-20th
          century turned the region into an energy powerhouse.
        </p>
        <p>
          In 1976, The Federal Skilled Worker (FSW) Program was launched.
          It was the world&apos;s first point-based immigration program,
          designed to objectively select skilled immigrants based on
          criteria like education, age, and language proficiency, rather
          than being chosen subjectively by immigration officers.
        </p>

        <p>
          It took a few years for the program to show effective changes,
          but by the 1990s a shift in immigration patterns could be
          observed.
        </p>

        <p>
          The immigration statistics for Calgary and Edmonton confirm this
          policy-driven change, with the Philippines, India, and China now
          ranking as the top three source countries for new immigrants in
          both cities, clearly supplanting the United Kingdom and other
          European nations.
        </p>

        <p>
          Looking at the two cities head-to-head, you can also see a shared
          linguistic DNA driven by the same economic engine. In Calgary,
          the most spoken non-official language is Punjabi (40,490
          speakers), followed closely by Tagalog (28,505 speakers), the
          primary language of the Philippines. Edmonton shows a very
          similar pattern, with Punjabi (32,345 speakers) and Tagalog
          (26,000 speakers) leading the pack as well. Both cities also host
          significant communities speaking Arabic (around 12,700 speakers
          in each) and Spanish (with over 19,300 in Calgary and 11,570 in
          Edmonton). This shows that the pursuit of careers in the energy
          sector has created two modern, vibrant, and incredibly diverse
          linguistic hubs right in the heart of the Prairies.
        </p>
        
        {cityInView && 
        <>
          <section className="chart-wrapper">
            <Chart
              data={immigrationChartData}
              title="Calgary"
              xLabel="Number of people"
              yLabel="Countries">
            </Chart>
          </section>

          <section className="chart-wrapper">
            <Chart 
              data={languagesChartData} 
              title="Languages Spoken in Calgary"
              xLabel="Number of people" 
              yLabel="Languages">
            </Chart>
          </section>
        </>
        }


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

  return languagesData;
}

export default CalgaryCity;