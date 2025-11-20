
/**
 * Simplifies the array returned by the language API into an
 * array accepted by the Chart component
 * This function also allows custom trimming of the array to only return desired length
 * with a default trimming of length 10
 * @param {Object} languagesArray the array returned by the language API
 * @returns an array of {label, value} objects accepted by the Chart component
 */
export default function simplifyLanguageArray(languagesArray, limit = 10){
  let languagesData = [];


  if (languagesArray.length !== 0){
    languagesData = languagesArray.map(data =>{
      return {
        label: data.Language,
        value: data.Count
      };
    });
  }

  const slicedArray = languagesData.slice(0, limit);

  return slicedArray;
}