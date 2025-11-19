import { useState, useEffect } from 'react';
import '../assets/styles/City.css';
import Chart from './Chart';

function MontrealCity({cityInView, reference}){
  const [cityData, setCityData] = useState({ immigration: [], languages: [] });

  const immigrationChartData = convertImmigrationDataObjectToArray(cityData);
  const languagesChartData = simplifyLanguageArray(cityData);

  useEffect(()=>{
    if (cityInView){
      // don't fetch data if already fetched
      if (cityData.immigration.length  > 0) return;
      if (cityData.languages.length > 0) return;
  
      Promise.all([
        fetch(`/api/immigration/montréal`),
        fetch(`/api/languages/montréal`),
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
            Next, we head to Montreal, the vibrant cultural heart of French
            North America. This city&apos;s identity is defined by its powerful
            Francophone ties. Montreal’s exposure to the world got a huge boost
            from Expo 67, the spectacularly successful World’s Fair. It put
            Montréal on the global stage.
      </p>
      
      <section className="montreal-section city-section" ref={reference}>

        <section className="text-chart-group__left">
          <Chart
            data={immigrationChartData} 
            title="Immigration patterns from 1980 to 1990"
            classes="text-chart-group__chart"
          />
          <section className="text-chart-group__texts">
            <p>
                  To protect its unique French identity, Quebec took control of
                  immigration. A key moment was Bill 101 (the Charter of the French
                  Language) in 1977, which made French the official language and
                  the required language for immigrant childrens schooling.
            </p>
            <p>
                  This control was cemented with the 1991 Canada-Quebec Accord.
                  This agreement gave the province almost total power to select its
                  own economic immigrants and manage their French integration (
                  francization ). The clear goal: to attract Francophones from
                  across the globe.
            </p>
            <p>
              This strategy worked and created an incredibly diverse mix.
              Between 1980 and 1990, over 161,000 new immigrants arrived.
            </p>
          </section>
        </section>
  
        <section className="text-chart-group">
          <section className="text-chart-group__texts">
            <p>
              In the years recorded of data from Stats Canada,
              Montréal welcomed a total of 1,020,835 immigrants (until 2021).
              The top origin country was Haiti, accounting for 79,720 immigrants, 
              which represented approximately 7.8% of the total.
            </p>
            <p>
              The remaining top five origin countries show a clear global Francophone
              attraction: Algeria (66,730 immigrants), France (63,235), Morocco (60,545), 
              and China (48,080). Collectively, these five nations contributed 318,310 immigrants, 
              or roughly 31.2% of the total immigrant population.
            </p>
            <p>
              Following this group, significant numbers also arrived from Italy (41,855),
              Lebanon (38,580), and the Philippines (28,965), further illustrating the diverse
              sources of new residents that have contributed to the demographic makeup of Montréal.
            </p>
          </section>
          <Chart
            data={immigrationChartData} 
            title="The Leading 20 Origin Countries of Immigrants (All recorded years)"
            classes="text-chart-group__chart"
          />
        </section>

        <section className="text-chart-group__left">
      
          <Chart
            data={languagesChartData} 
            title="Top 15 spoken languages"
            classes="text-chart-group__chart"
          />

          <section className="text-chart-group__texts">
            <p>
                  This blend makes Montréal the only major Canadian city where
                  French is the majority language, spoken by over 2.7 million
                  people, while English also maintains a major presence with
                  693,340 speakers. The city&apos;s truly cosmopolitan nature is
                  further reflected in its leading non-official languages, where
                  Spanish (90,235 speakers) and Arabic (89,800 speakers) indicate
                  strong links to Latin America, the Middle East, and North Africa.
            </p>
        
            <p>
                  However, European languages also have a deep historical
                  footprint, with large communities of Italian (25,805 speakers),
                  Russian (21,015 speakers), and Romanian (20,590 speakers)
                  speakers.
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

export default MontrealCity;