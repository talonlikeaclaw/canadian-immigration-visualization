import { useState, useEffect } from 'react';
import '../assets/styles/City.css';
import Chart from './Chart';

/**
 * @param {boolean} cityInView flag to determine if the city of halifax is in view
 * @param {React Ref Object} reference a reference object used to determine the cityInView flag
 * @returns a component representing the entire Halifax city component
 */
function HalifaxCity({cityInView, reference}){
  const [languageData, setLanguageData] = useState([]);
  const [immigrationDataset1, setImmigrationDataset1] = useState([]);
  const [immigrationDataset2, setImmigrationDataset2] = useState([]);

  // fetch all data for charts when the city comes into view
  useEffect(()=>{
    if (cityInView){
      // don't fetch data if already fetched
      if (languageData.length > 0) return;
      if (immigrationDataset1.length > 0) return;
      if (immigrationDataset2.length > 0) return;
      Promise.all([
        fetch(`/api/languages/halifax`),
        fetch(`/api/immigration/halifax/period/1980`),
        fetch(`/api/immigration/halifax/period/2016/2021`),
      ]).
        then(([languageResponse, immigration1Response, immigration2Response]) => {
          if (languageResponse.ok && immigration1Response.ok && immigration2Response.ok){
            return Promise.all([
              languageResponse.json(),
              immigration1Response.json(),
              immigration2Response.json(),
            ]);

          }
        }).
        then(([languageData, immigration1Data, immigration2Data]) => {
          // Update the states
          const simplifiedLanguagesArray = simplifyLanguageArray(languageData);
          setLanguageData(simplifiedLanguagesArray);

          const convertedImmigration1Array = convertImmigrationDataObjectToArray(immigration1Data);
          setImmigrationDataset1(convertedImmigration1Array);

          const convertedImmigration2Array = convertImmigrationDataObjectToArray(immigration2Data);
          setImmigrationDataset2(convertedImmigration2Array);

        }).
        catch(error => {
          // Handle any errors that occurred in the chain
          console.error(error);
        });
    }
  
  }, [cityInView, languageData, immigrationDataset1, immigrationDataset2]);

  return (
    <>
      <p className="transition">Our journey starts in Halifax, the capital of Nova Scotia.</p>
      
      <section className="halifax-section city-section" ref={reference}>
        <section className="text-chart-group">
          <section className="text-chart-group__texts">
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
          </section>

          <Chart 
            data={immigrationDataset1}
            title="Immigration patterns before 1980"
            classes="text-chart-group__chart"
          />
        </section>

        <section className="text-chart-group__left">
          <Chart
            data={languageData}
            title="Top 10 languages spoken (excluding English)"
            classes="text-chart-group__chart"
          />

          <section className="text-chart-group__texts">
            <p>
            This deep British heritage laid the linguistic foundation. Today,
            while English is overwhelmingly the dominant language spoken by
            420,230 people, Halifax is entering a new era, welcoming a fresh
            wave of global immigrants.
            </p>
            <p>
            Among the non-official languages, Mandarin and Arabic are the most widely
            spoken, with 4,670 and 4,475 speakers each, significantly outpacing the next
            largest groups, Punjabi (2,470 speakers) and Korean (1,600
            speakers).
            </p>
            <p>
            The fact that Mandarin and Arabic, along with Tagalog (1,315 speakers) and
            Hindi (1,040 speakers) combined are more than twice as prevalent as French
            (3,470 speakers) highlights the recent diversification of
            immigration in this East Coast, drawing communities primarily
            from the Middle East, South Asia, and East Asia.
            </p>
          </section>
        </section>

        <section className="text-chart-group">
          <section className="text-chart-group__texts">
            <p>
            In late 2015, Halifax moved from watching the Syrian refugee
            crisis on the news to becoming one of the places where that
            crisis was felt in real lives and real neighbourhoods.
            </p>
            <p>
            The city expected to receive 500 to 1,200 refugees over just 
            three months, compared to the 123–252 refugees per year it 
            had usually received since 2004, and by April 1, 2016 more 
            than 500 special ID cards had already been distributed, with 
            about 800 cards projected for the year.
            </p>
            <p>
            Almost all (87.5%) Syrian immigrants arrived after 2016, directly 
            tied to Canada’s 2015–2016 Syrian refugee resettlement program, 
            and Halifax&apos;s “Welcomed in Halifax” initiative, a program that gives 
            newly arrived refugees one year of free access to Halifax Transit and 
            free admission to municipal recreation facilities and programs
            </p>
          </section>
          <Chart
            data={immigrationDataset2}
            title="Immigration patterns from 2016 to 2021"
            classes="text-chart-group__chart"
          />
        </section>

      </section>

      <div className="city-divider"></div>
    </>
  );
}

/**
 * Transforms the object returned by the immigration APIs into an
 *  array accepted by the Chart component
 * This function also trims the original data to only be of length 10
 * @param {Object} cityDataObj the object returned by the immigration APIs
 * @returns an array of {label, value} objects accepted by the Chart component
 */
function convertImmigrationDataObjectToArray(immigrationDataset){
  let immigrationData = [];
  
  if (immigrationDataset.length !== 0){
    immigrationData = immigrationDataset.countries;
  }

  const immigrationEntries = Object.entries(immigrationData);

  const immigrationChartData = immigrationEntries.map(([countryName, value]) => ({
    label: countryName,
    value: value
  }));

  immigrationChartData.length = 10;

  return immigrationChartData;
}

/**
 * Simplifies the array retrieved from the language API
 * to an array accepted by the Chart component
 * This function also trims the original data to only be of length 10
 * And it removes English from the data in order to only display the non-offical languages
 * @param {Object} languagesArray 
 * @returns an array of {label, value} objects accepted by the Chart component
 */
function simplifyLanguageArray(languagesArray){
  let languagesData = [];


  if (languagesArray.length !== 0){
    languagesData = languagesArray.map(data =>{
      return {
        label: data.Language,
        value: data.Count
      };
    });
  }
  languagesData.shift();
  languagesData.length = 10;
  return languagesData;
}

export default HalifaxCity;