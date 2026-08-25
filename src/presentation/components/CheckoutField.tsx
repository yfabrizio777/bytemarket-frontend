import type {
  CheckoutTextField,
} from '../../application/checkout/CheckoutForm'

interface CheckoutFieldProps {
  name: CheckoutTextField
  label: string
  value: string
  error?: string
  type?: 'text' | 'email' | 'tel'
  autoComplete?: string
  inputMode?: 'text' | 'email' | 'tel' | 'numeric'
  onChange: (name: CheckoutTextField, value: string) => void
  onBlur: (name: CheckoutTextField) => void
}

function CheckoutField({
  name,
  label,
  value,
  error,
  type = 'text',
  autoComplete,
  inputMode = 'text',
  onChange,
  onBlur,
}: CheckoutFieldProps) {
  const errorId = `${name}-error`

  return (
    <div className="checkout-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        onBlur={() => onBlur(name)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <span className="checkout-field__error" id={errorId}>{error}</span>}
    </div>
  )
}

export default CheckoutField
