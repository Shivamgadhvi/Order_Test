import { useState } from 'react'
import { Flame, Sandwich, Soup, Cookie, Cake, Minus, Plus } from 'lucide-react'
import { ICE_CREAM_PRICE } from '../data/menuItems'

const ICONS = { flame: Flame, sandwich: Sandwich, soup: Soup, cookie: Cookie, cake: Cake }

export default function ItemCard({ item, categoryIcon, cartEntry, onAdd, onChangeQty, onToggleIceCream }) {
  const [imgError, setImgError] = useState(false)
  const Icon = ICONS[categoryIcon] || Cake
  const qty = cartEntry?.qty || 0

  return (
    <div className="item-card">
      <div className="item-thumb">
        {item.image && !imgError ? (
          <img src={item.image} alt={item.name} onError={() => setImgError(true)} />
        ) : (
          <Icon size={24} />
        )}
      </div>
      <div className="item-body">
        <div className="item-name">{item.name}</div>
        <div className="item-tagline">{item.tagline}</div>
        <div className="item-row">
          <span className="item-price">₹{item.price}</span>
          {qty === 0 ? (
            <button className="add-btn" onClick={() => onAdd(item.id)}>Add</button>
          ) : (
            <div className="qty-stepper">
              <button aria-label="Decrease" onClick={() => onChangeQty(item.id, -1)}><Minus size={14} /></button>
              <span className="qty-val">{qty}</span>
              <button aria-label="Increase" onClick={() => onChangeQty(item.id, 1)}><Plus size={14} /></button>
            </div>
          )}
        </div>
        {qty > 0 && item.iceCream && (
          <label className="icecream-toggle">
            <input
              type="checkbox"
              checked={cartEntry?.withIceCream || false}
              onChange={(e) => onToggleIceCream(item.id, e.target.checked)}
            />
            Add ice cream scoop (+₹{ICE_CREAM_PRICE} each)
          </label>
        )}
      </div>
    </div>
  )
}
