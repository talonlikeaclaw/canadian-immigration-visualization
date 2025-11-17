import { useState, useEffect } from 'react';
import '../assets/styles/City.css';
import Chart from './Chart';

function HalifaxCity({cityInView, reference}){
  const [cityData, setCityData] = useState({ immigration: [], languages: [] });

  const immigrationChartData = convertImmigrationDataObjectToArray(cityData);
  const languagesChartData = simplifyLanguageArray(cityData);

  useEffect(()=>{
    if (cityInView){
      // don't fetch data if already fetched
      if (cityData.immigration.length > 0) return;
      if (cityData.languages.length > 0) return;
      Promise.all([
        fetch(`/api/immigration/halifax`),
        fetch(`/api/languages/halifax`),
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
      <p className="transition">Our journey starts in Halifax, the capital of Nova Scotia.</p>
      
      <section className="halifax-section city-section" ref={reference}>
        <p>
        For centuries, Halifax&apos;s story was all about the British
        Empire and the sea. As a major port and military hub, its
        earliest and largest immigrant groups were British and Irish.
        </p>
        <p>
        These settlers came as early as the 1700s, often as fishermen,
        sailors, and labourers. The Irish, for example, had a strong
        community here long before the devastating Potato Famine pushed
        masses to North America.
        </p>
        <p>
        This deep British heritage laid the linguistic foundation. Today,
        while English is overwhelmingly the dominant language spoken by
        420,230 people, Halifax is entering a new era, welcoming a fresh
        wave of global immigrants.
        </p>
        <p>
        Among the non-official languages, Arabic is the most widely
        spoken, with 4,475 speakers, significantly outpacing the next
        largest groups, Punjabi (2,470 speakers) and Korean (1,600
        speakers).
        </p>
        <p>
        The fact that Arabic, along with Tagalog (1,315 speakers) and
        Hindi (1,040 speakers) combined are more prevalent than French
        (3,470 speakers) highlights the recent diversification of
        immigration in this East Coast, drawing communities primarily
        from the Middle East, South Asia, and East Asia.
        </p>

        <Chart data={immigrationChartData} title="halifax" />
        <Chart data={languagesChartData} title="halifax" />
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

export default HalifaxCity;