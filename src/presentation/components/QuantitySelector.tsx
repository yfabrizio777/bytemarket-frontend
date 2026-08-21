interface QuantitySelectorProps {
  productTitle: string
  quantity: number
  stock: number
  onChange: (quantity: number) => void
}

function QuantitySelector({
  productTitle,
  quantity,
  stock,
  onChange,
}: QuantitySelectorProps) {
  return (
    <div className="quantity-selector" aria-label={`Cantidad de ${productTitle}`}>
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        aria-label={`Reducir cantidad de ${productTitle}`}
      >
        −
      </button>
      <output aria-live="polite" aria-label={`${quantity} unidades`}>{quantity}</output>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= stock}
        aria-label={`Aumentar cantidad de ${productTitle}`}
      >
        +
      </button>
    </div>
  )
}

export default QuantitySelector
