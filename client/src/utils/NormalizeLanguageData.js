
/**
 * Simplifies the array returned by the language API into an
 * array accepted by the Chart component
 * This function also allows custom trimming of the array to only return desired length
 * with a default trimming of length 10
 * @param {Object} languagesArray the array returned by the language API
 * @returns an array of {label, value} objects accepted by the Chart component
 */
export default function simplifyLanguageArray(languagesArray, limit = 10){
  if (languagesArray.length === 0) return [];
  if (languagesArray === undefined) return [];
  if (languagesArray === null) return [];

  let languagesData = [];

  if (languagesArray.length !== 0){
    languagesData = languagesArray.map(data =>{
      return {
        label: data.Language,
        value: data.Count
      };
    });
  }

  const filteredLanguagesArray = languagesData.filter(({ label }) => {
    // For anglophone cities I only removed English and I kept the french language
    if (languagesData[0].label === 'English') return label !== 'English';

    // For francophone cities (i.e. Montreal) 
    // I removed both french and english language because 
    // the ratio was very bog compared to the other languages
    if (languagesData[0].label === 'French') return label !== 'French' && label !== 'English';
  });

  const slicedArray = filteredLanguagesArray.slice(0, limit);

  return slicedArray;
}