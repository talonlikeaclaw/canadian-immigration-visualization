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
        fetch(`/api/immigration/vancouver`),
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
    
        <p>
              The list of most common non-official languages reads like a map
              of the Asia-Pacific. Vancouver has substantial populations
              speaking Korean (40,045 speakers) and Tagalog (37,890 speakers).
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
    
        <Chart 
          data={immigrationChartData}
          title="Vancouver" 
          xLabel="Number of people"
          yLabel="Countries">
        </Chart>
    
        <Chart 
          data={languagesChartData} 
          title="Languages Spoken in Calgary"
          xLabel="Number of people" 
          yLabel="Languages">
        </Chart>
    
      </section>
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

export default VancouverCity;