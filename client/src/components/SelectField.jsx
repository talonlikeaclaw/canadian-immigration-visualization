import '../assets/styles/DataExplorer.css';

export default function SelectField({
  label,
  id,
  value,
  onChange,
  options,
  disabled
}) {
  return (
    <div className="field-select">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {options.map(opt =>
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        )}
      </select>
    </div>
  );
}
