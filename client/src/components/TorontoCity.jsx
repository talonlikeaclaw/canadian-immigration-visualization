import { useState, useEffect } from 'react';
import '../assets/styles/City.css';
import Chart from './Chart';

function TorontoCity({cityInView, reference}){
  const [cityData, setCityData] = useState({ immigration: [], languages: [] });

  const immigrationChartData = convertImmigrationDataObjectToArray(cityData);
  const languagesChartData = simplifyLanguageArray(cityData);

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
            We move west to Toronto, the massive, English-speaking metropolis
            that truly took off after World War II.
      </p>
      <section className="toronto-section city-section" ref={reference}>
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
            data={immigrationChartData}
            title="The Top 20 Countries Driving Immigration (All Time)"
            classes="text-chart-group__chart"
          />
        </section>

        <section className="text-chart-group__left">
          <Chart
            data={languagesChartData} 
            title="Top 20 spoken languages (excluding English)"
            classes="text-chart-group__chart"
          />
          <section className="text-chart-group__texts">
            <p>
              The most spoken non-official language is Punjabi (Panjabi) with
              161,965 speakers. This is followed by Urdu (89,120 speakers) and
              Tamil (83,225 speakers), clearly showing Toronto&apos;s powerful
              ties to India, Pakistan, and Sri Lanka. Other huge communities
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

  immigrationChartData.length = 20;

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

  languagesData.shift();

  languagesData.length = 20;

  return languagesData;
}

export default TorontoCity;