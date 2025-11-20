/**
 * Transforms the object returned by the immigration APIs into an
 *  array accepted by the Chart component
 * This function also allows custom trimming of the array to only return desired length
 * with a default trimming of length 10
 * @param {Object} cityDataObj the object returned by the immigration APIs
 * @param {number} limit optional parameter determining how long the end array will be
 * @returns an array of {label, value} objects accepted by the Chart component
 */
export default function convertImmigrationDataObjectToArray(immigrationDataset, limit = 10){
  let immigrationData = [];
  
  if (immigrationDataset.length !== 0){
    immigrationData = immigrationDataset.countries;
  }

  const immigrationEntries = Object.entries(immigrationData);

  const immigrationChartData = immigrationEntries.map(([countryName, value]) => ({
    label: countryName,
    value: value
  }));

  immigrationChartData.length = limit;

  return immigrationChartData;
}