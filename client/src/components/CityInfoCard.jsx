import '../assets/styles/DataExplorer.css';

export default function CityInfoCard({ city, info }) {
  if (!info || !city) return null;

  return (
    <div className="city-info">
      <h4>About {city}</h4>
      <p>
        {city} in the province of <strong>{info.Province}</strong>{' '}
        has a population of <strong>{info.Population.toLocaleString()}</strong> people over{' '}
        <strong>{info.AreaKm2.toLocaleString()}</strong> km².
      </p>
    </div>
  );
}
