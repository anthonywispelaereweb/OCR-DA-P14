import PropTypes from 'prop-types'

const AppInput = ({ 
  id, 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  required = false,
  className = 'form-input',
  placeholder,
  ...props 
}) => {
  return (
    <div>
      <label htmlFor={id} className='form-label'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={className}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}

AppInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string
}

export default AppInput
