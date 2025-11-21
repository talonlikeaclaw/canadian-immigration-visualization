import '../assets/styles/Checkbox.css';

function Checkbox({label = 'Include Official Language'}){
  return (
    <section className="checkbox-container">
      <label htmlFor="checkbox">{label}</label>
      <input type="checkbox" name="checkbox" id="checkbox" checked />
    </section>

  );
}

export default Checkbox;