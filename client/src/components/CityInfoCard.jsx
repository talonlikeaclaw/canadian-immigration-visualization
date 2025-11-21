import '../assets/styles/DataExplorer.css';

/**
 * Displays facts about a city when metadata is available.
 * @param {Object} props
 * @param {string} props.city - City name.
 * @param {
 *     {
 *       Province: string,
 *       Population: number,
 *       AreaKm2, number,
 *       GeoLocation: [lat:number, lon: number]
 *     }
 * } props.info - City metadata.
 * @returns {JSX.Element|null} City info card or null when data is missing.
 */
export default function CityInfoCard({ city, info }) {
  if (!info || !city) return null;

  return (
    <div className="city-info">
      <h4>About {city}</h4>
      <p>
        <strong>{city}</strong> in the province of <strong>{info.Province}</strong>{' '}
        has a population of <strong>{info.Population.toLocaleString()}</strong> people over{' '}
        <strong>{info.AreaKm2.toLocaleString()}</strong> km².
      </p>
    </div>
  );
}
