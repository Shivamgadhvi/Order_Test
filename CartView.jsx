import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { ICE_CREAM_PRICE } from '../data/menuItems'

export default function CartView({ lines, total, onBack, onConfirm }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  return (
    <div className="screen">
      <div className="screen-title-row">
        <button onClick={onBack} aria-label="Back to menu"><ArrowLeft size={19} /></button>
        <h2 className="screen-title">Your order</h2>
      </div>

      {lines.map((l) => (
        <div className="cart-line" key={l.key}>
          <div className="cart-line-name">
            <span>{l.item.name} x{l.qty}</span>
            {l.withIceCream && <span className="cart-line-sub">+ ice cream x{l.qty}</span>}
          </div>
          <span>₹{l.lineTotal}</span>
        </div>
      ))}

      <div className="cart-total-row">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <div className="field-label">Name (optional)</div>
      <input
        className="field-input"
        placeholder="Skip if you'd rather not share"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="field-label">Phone (optional)</div>
      <input
        className="field-input"
        placeholder="Only if you want an update"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <div className="cash-note">Cash on pickup</div>
      <button className="confirm-btn" onClick={() => onConfirm({ name: name.trim(), phone: phone.trim() })}>
        Confirm order
      </button>
    </div>
  )
}
