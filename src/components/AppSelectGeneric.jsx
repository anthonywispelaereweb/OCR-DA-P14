import PropTypes from 'prop-types'

const AppSelectGeneric = ({ 
  id, 
  label, 
  name, 
  value, 
  onChange, 
  options = [],
  required = false,
  className = 'form-input',
  placeholder = 'Select an option',
  ...props 
}) => {
  return (
    <div>
      <label htmlFor={id} className='form-label'>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={className}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

AppSelectGeneric.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string
}

export default AppSelectGeneric
