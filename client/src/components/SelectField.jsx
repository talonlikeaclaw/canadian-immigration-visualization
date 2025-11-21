import '../assets/styles/DataExplorer.css';

/**
 * Styled select input field with label and option rendering.
 * @param {Object} props
 * @param {string} props.label - Field label.
 * @param {string} props.id - Element id for accessibility.
 * @param {string|number} props.value - Current selected value.
 * @param {(event: React.ChangeEvent<HTMLSelectElement>) => void} props.onChange - Change handler.
 * @param {{value: string, label: string}[]} props.options - Select options.
 * @param {boolean} [props.disabled] - Whether the field is disabled.
 * @returns {JSX.Element} Labeled select control.
 */
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
